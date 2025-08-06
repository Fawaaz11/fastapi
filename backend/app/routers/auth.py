from datetime import timedelta
from fastapi import APIRouter, HTTPException, status, Depends
from app.models import UserCreate, UserResponse, UserLogin, Token
from app.auth import get_password_hash, authenticate_user, create_access_token
from app.database import database, users_table
from app.config import settings

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    # Check if user already exists
    query = users_table.select().where(users_table.c.email == user.email)
    existing_user = await database.fetch_one(query)
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password and create user
    hashed_password = get_password_hash(user.password)
    query = users_table.insert().values(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    user_id = await database.execute(query)
    
    # Return created user
    query = users_table.select().where(users_table.c.id == user_id)
    created_user = await database.fetch_one(query)
    
    return UserResponse(**created_user)

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    user = await authenticate_user(user_credentials.email, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
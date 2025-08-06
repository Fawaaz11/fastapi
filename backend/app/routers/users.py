from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models import UserResponse, UserUpdate
from app.auth import get_current_user
from app.database import database, users_table

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user = Depends(get_current_user)):
    return UserResponse(**current_user)

@router.put("/me", response_model=UserResponse)
async def update_current_user(
    user_update: UserUpdate,
    current_user = Depends(get_current_user)
):
    update_data = user_update.dict(exclude_unset=True)
    if not update_data:
        return UserResponse(**current_user)
    
    query = users_table.update().where(
        users_table.c.id == current_user.id
    ).values(**update_data)
    
    await database.execute(query)
    
    # Return updated user
    query = users_table.select().where(users_table.c.id == current_user.id)
    updated_user = await database.fetch_one(query)
    
    return UserResponse(**updated_user)
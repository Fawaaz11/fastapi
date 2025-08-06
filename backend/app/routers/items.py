from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models import ItemCreate, ItemResponse, ItemUpdate
from app.auth import get_current_user
from app.database import database, items_table

router = APIRouter()

@router.get("/", response_model=List[ItemResponse])
async def get_items(current_user = Depends(get_current_user)):
    query = items_table.select().where(items_table.c.owner_id == current_user.id)
    items = await database.fetch_all(query)
    return [ItemResponse(**item) for item in items]

@router.post("/", response_model=ItemResponse)
async def create_item(item: ItemCreate, current_user = Depends(get_current_user)):
    query = items_table.insert().values(
        title=item.title,
        description=item.description,
        owner_id=current_user.id
    )
    item_id = await database.execute(query)
    
    # Return created item
    query = items_table.select().where(items_table.c.id == item_id)
    created_item = await database.fetch_one(query)
    
    return ItemResponse(**created_item)

@router.get("/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int, current_user = Depends(get_current_user)):
    query = items_table.select().where(
        (items_table.c.id == item_id) & 
        (items_table.c.owner_id == current_user.id)
    )
    item = await database.fetch_one(query)
    
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    
    return ItemResponse(**item)

@router.put("/{item_id}", response_model=ItemResponse)
async def update_item(
    item_id: int,
    item_update: ItemUpdate,
    current_user = Depends(get_current_user)
):
    # Check if item exists and belongs to user
    query = items_table.select().where(
        (items_table.c.id == item_id) & 
        (items_table.c.owner_id == current_user.id)
    )
    existing_item = await database.fetch_one(query)
    
    if not existing_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    
    update_data = item_update.dict(exclude_unset=True)
    if not update_data:
        return ItemResponse(**existing_item)
    
    query = items_table.update().where(
        items_table.c.id == item_id
    ).values(**update_data)
    
    await database.execute(query)
    
    # Return updated item
    query = items_table.select().where(items_table.c.id == item_id)
    updated_item = await database.fetch_one(query)
    
    return ItemResponse(**updated_item)

@router.delete("/{item_id}")
async def delete_item(item_id: int, current_user = Depends(get_current_user)):
    # Check if item exists and belongs to user
    query = items_table.select().where(
        (items_table.c.id == item_id) & 
        (items_table.c.owner_id == current_user.id)
    )
    existing_item = await database.fetch_one(query)
    
    if not existing_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )
    
    query = items_table.delete().where(items_table.c.id == item_id)
    await database.execute(query)
    
    return {"message": "Item deleted successfully"}
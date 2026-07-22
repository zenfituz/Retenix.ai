from fastapi import FastAPI, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import crud
import schemas
from database import get_db

app = FastAPI()

# Mock Auth Dependency
async def get_current_gym_id(authorization: str = Header(...)) -> int:
    # In a real app, verify the JWT token and extract the gym_id
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token")
    token = authorization.split(" ")[1]
    if token == "mock_token":
        return 1  # Mock gym_id
    raise HTTPException(status_code=401, detail="Unauthorized")

@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Members Endpoints
@app.post("/members/", response_model=schemas.Member)
async def create_member(
    member: schemas.MemberCreate, 
    gym_id: int = Depends(get_current_gym_id), 
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_member(db=db, member=member, gym_id=gym_id)

@app.get("/members/", response_model=List[schemas.Member])
async def read_members(
    skip: int = 0, 
    limit: int = 100, 
    gym_id: int = Depends(get_current_gym_id), 
    db: AsyncSession = Depends(get_db)
):
    return await crud.get_members(db=db, gym_id=gym_id, skip=skip, limit=limit)

@app.get("/members/{member_id}", response_model=schemas.Member)
async def read_member(
    member_id: int, 
    gym_id: int = Depends(get_current_gym_id), 
    db: AsyncSession = Depends(get_db)
):
    member = await crud.get_member(db=db, member_id=member_id)
    if member is None or member.gym_id != gym_id:
        raise HTTPException(status_code=404, detail="Member not found")
    return member

@app.put("/members/{member_id}", response_model=schemas.Member)
async def update_member(
    member_id: int, 
    member_update: schemas.MemberUpdate, 
    gym_id: int = Depends(get_current_gym_id), 
    db: AsyncSession = Depends(get_db)
):
    member = await crud.get_member(db=db, member_id=member_id)
    if member is None or member.gym_id != gym_id:
        raise HTTPException(status_code=404, detail="Member not found")
    return await crud.update_member(db=db, member_id=member_id, member_update=member_update)

@app.delete("/members/{member_id}")
async def delete_member(
    member_id: int, 
    gym_id: int = Depends(get_current_gym_id), 
    db: AsyncSession = Depends(get_db)
):
    member = await crud.get_member(db=db, member_id=member_id)
    if member is None or member.gym_id != gym_id:
        raise HTTPException(status_code=404, detail="Member not found")
    await crud.delete_member(db=db, member_id=member_id)
    return {"message": "Member deleted successfully"}

# Membership Plans Endpoints
@app.post("/membership-plans/", response_model=schemas.MembershipPlan)
async def create_membership_plan(
    plan: schemas.MembershipPlanCreate, 
    gym_id: int = Depends(get_current_gym_id), 
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_membership_plan(db=db, plan=plan, gym_id=gym_id)

@app.get("/membership-plans/", response_model=List[schemas.MembershipPlan])
async def read_membership_plans(
    skip: int = 0, 
    limit: int = 100, 
    gym_id: int = Depends(get_current_gym_id), 
    db: AsyncSession = Depends(get_db)
):
    return await crud.get_membership_plans(db=db, gym_id=gym_id, skip=skip, limit=limit)

@app.get("/membership-plans/{plan_id}", response_model=schemas.MembershipPlan)
async def read_membership_plan(
    plan_id: int, 
    gym_id: int = Depends(get_current_gym_id), 
    db: AsyncSession = Depends(get_db)
):
    plan = await crud.get_membership_plan(db=db, plan_id=plan_id)
    if plan is None or plan.gym_id != gym_id:
        raise HTTPException(status_code=404, detail="Membership plan not found")
    return plan

@app.put("/membership-plans/{plan_id}", response_model=schemas.MembershipPlan)
async def update_membership_plan(
    plan_id: int, 
    plan_update: schemas.MembershipPlanUpdate, 
    gym_id: int = Depends(get_current_gym_id), 
    db: AsyncSession = Depends(get_db)
):
    plan = await crud.get_membership_plan(db=db, plan_id=plan_id)
    if plan is None or plan.gym_id != gym_id:
        raise HTTPException(status_code=404, detail="Membership plan not found")
    return await crud.update_membership_plan(db=db, plan_id=plan_id, plan_update=plan_update)

@app.delete("/membership-plans/{plan_id}")
async def delete_membership_plan(
    plan_id: int, 
    gym_id: int = Depends(get_current_gym_id), 
    db: AsyncSession = Depends(get_db)
):
    plan = await crud.get_membership_plan(db=db, plan_id=plan_id)
    if plan is None or plan.gym_id != gym_id:
        raise HTTPException(status_code=404, detail="Membership plan not found")
    await crud.delete_membership_plan(db=db, plan_id=plan_id)
    return {"message": "Membership plan deleted successfully"}

# AI Copilot Endpoint
@app.post("/api/chat", response_model=schemas.ChatResponse)
async def ai_chat(
    request: schemas.ChatRequest,
    gym_id: int = Depends(get_current_gym_id)
):
    # Mocking LLM API call
    # In a real scenario, you'd use litellm or anthropic SDK here.
    suggestion = f"Based on '{request.context}', regarding '{request.message}', consider offering a personalized discount or reaching out to understand their attendance drop."
    return {"suggestion": suggestion}

# Trainers Endpoints
@app.get("/api/trainers", response_model=List[schemas.Trainer])
async def list_trainers(
    gym_id: int = Depends(get_current_gym_id),
    db: AsyncSession = Depends(get_db)
):
    return await crud.get_trainers(db=db, gym_id=gym_id)

@app.post("/api/members/{id}/assign-trainer", response_model=schemas.Member)
async def assign_trainer_to_member(
    id: int,
    trainer_id: int,
    gym_id: int = Depends(get_current_gym_id),
    db: AsyncSession = Depends(get_db)
):
    member = await crud.get_member(db=db, member_id=id)
    if not member or member.gym_id != gym_id:
        raise HTTPException(status_code=404, detail="Member not found")
    
    trainers = await crud.get_trainers(db=db, gym_id=gym_id)
    if trainer_id not in [t.id for t in trainers]:
        raise HTTPException(status_code=400, detail="Invalid trainer")
        
    return await crud.assign_trainer(db=db, member_id=id, trainer_id=trainer_id)

# Analytics Endpoint
@app.get("/api/analytics", response_model=schemas.AnalyticsResponse)
async def get_analytics(
    gym_id: int = Depends(get_current_gym_id),
    db: AsyncSession = Depends(get_db)
):
    # Mock comprehensive analytics for the gym
    return {
        "retention_rate": 85.5,
        "mrr": 15000.0,
        "dau": 120,
        "churn_histogram": {"0-30 days": 5, "31-60 days": 12, "61-90 days": 3}
    }


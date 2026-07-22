from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import models
import schemas

# Member CRUD
async def get_member(db: AsyncSession, member_id: int):
    result = await db.execute(select(models.Member).filter(models.Member.id == member_id))
    return result.scalars().first()

async def get_members(db: AsyncSession, gym_id: int, skip: int = 0, limit: int = 100):
    result = await db.execute(
        select(models.Member).filter(models.Member.gym_id == gym_id).offset(skip).limit(limit)
    )
    return result.scalars().all()

async def create_member(db: AsyncSession, member: schemas.MemberCreate, gym_id: int):
    db_member = models.Member(**member.model_dump(), gym_id=gym_id)
    db.add(db_member)
    await db.commit()
    await db.refresh(db_member)
    return db_member

async def update_member(db: AsyncSession, member_id: int, member_update: schemas.MemberUpdate):
    db_member = await get_member(db, member_id)
    if not db_member:
        return None
    for key, value in member_update.model_dump(exclude_unset=True).items():
        setattr(db_member, key, value)
    await db.commit()
    await db.refresh(db_member)
    return db_member

async def delete_member(db: AsyncSession, member_id: int):
    db_member = await get_member(db, member_id)
    if db_member:
        await db.delete(db_member)
        await db.commit()
    return db_member

# Trainer CRUD
async def get_trainers(db: AsyncSession, gym_id: int):
    result = await db.execute(
        select(models.GymStaff).filter(models.GymStaff.gym_id == gym_id, models.GymStaff.role == 'trainer')
    )
    return result.scalars().all()

async def assign_trainer(db: AsyncSession, member_id: int, trainer_id: int):
    db_member = await get_member(db, member_id)
    if db_member:
        db_member.trainer_id = trainer_id
        await db.commit()
        await db.refresh(db_member)
    return db_member

# MembershipPlan CRUD
async def get_membership_plan(db: AsyncSession, plan_id: int):
    result = await db.execute(select(models.MembershipPlan).filter(models.MembershipPlan.id == plan_id))
    return result.scalars().first()

async def get_membership_plans(db: AsyncSession, gym_id: int, skip: int = 0, limit: int = 100):
    result = await db.execute(
        select(models.MembershipPlan).filter(models.MembershipPlan.gym_id == gym_id).offset(skip).limit(limit)
    )
    return result.scalars().all()

async def create_membership_plan(db: AsyncSession, plan: schemas.MembershipPlanCreate, gym_id: int):
    db_plan = models.MembershipPlan(**plan.model_dump(), gym_id=gym_id)
    db.add(db_plan)
    await db.commit()
    await db.refresh(db_plan)
    return db_plan

async def update_membership_plan(db: AsyncSession, plan_id: int, plan_update: schemas.MembershipPlanUpdate):
    db_plan = await get_membership_plan(db, plan_id)
    if not db_plan:
        return None
    for key, value in plan_update.model_dump(exclude_unset=True).items():
        setattr(db_plan, key, value)
    await db.commit()
    await db.refresh(db_plan)
    return db_plan

async def delete_membership_plan(db: AsyncSession, plan_id: int):
    db_plan = await get_membership_plan(db, plan_id)
    if db_plan:
        await db.delete(db_plan)
        await db.commit()
    return db_plan

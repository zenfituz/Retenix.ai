from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from decimal import Decimal

# Member Schemas
class MemberBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    status: Optional[str] = "active"

class MemberCreate(MemberBase):
    pass

class MemberUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    status: Optional[str] = None

class Member(MemberBase):
    id: int
    gym_id: int
    join_date: datetime
    churn_risk_score: Optional[float] = None

    class Config:
        from_attributes = True

# AI Copilot Schemas
class ChatRequest(BaseModel):
    context: str
    message: str

class ChatResponse(BaseModel):
    suggestion: str

# MembershipPlan Schemas
class MembershipPlanBase(BaseModel):
    name: str
    price: Decimal
    duration_days: int

class MembershipPlanCreate(MembershipPlanBase):
    pass

class MembershipPlanUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[Decimal] = None
    duration_days: Optional[int] = None

class MembershipPlan(MembershipPlanBase):
    id: int
    gym_id: int

    class Config:
        from_attributes = True

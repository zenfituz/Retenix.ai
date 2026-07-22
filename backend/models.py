import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Numeric
from sqlalchemy.orm import relationship
from database import Base

class Gym(Base):
    __tablename__ = "gyms"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class GymStaff(Base):
    __tablename__ = "gym_staff"
    
    id = Column(Integer, primary_key=True, index=True)
    gym_id = Column(Integer, ForeignKey("gyms.id"), nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    
    gym = relationship("Gym")

class Member(Base):
    __tablename__ = "members"
    
    id = Column(Integer, primary_key=True, index=True)
    gym_id = Column(Integer, ForeignKey("gyms.id"), nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    join_date = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String, default="active")
    trainer_id = Column(Integer, ForeignKey("gym_staff.id"), nullable=True)
    
    gym = relationship("Gym")
    trainer = relationship("GymStaff")

    @property
    def churn_risk_score(self) -> float:
        import churn_service
        return churn_service.calculate_churn_risk(self.id) if self.id else 0.0

class MembershipPlan(Base):
    __tablename__ = "membership_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    gym_id = Column(Integer, ForeignKey("gyms.id"), nullable=False)
    name = Column(String, nullable=False)
    price = Column(Numeric, nullable=False)
    duration_days = Column(Integer, nullable=False, default=30)
    
    gym = relationship("Gym")

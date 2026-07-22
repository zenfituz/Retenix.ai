import random

def calculate_churn_risk(member_id: int) -> float:
    """
    Calculates churn risk score (0.0 to 100.0) based on 5 factors:
    - Attendance drop
    - Streak broken
    - Class engagement
    - Sentiment
    - Payment delayed
    """
    # Mocking the metrics for now since we don't have the tables yet.
    # We use member_id as a seed to ensure deterministic but varied results.
    random.seed(member_id)
    
    attendance_drop = random.uniform(0, 20)
    streak_broken = random.uniform(0, 20)
    class_engagement = random.uniform(0, 20)
    sentiment = random.uniform(0, 20)
    payment_delayed = random.uniform(0, 20)
    
    total_risk = attendance_drop + streak_broken + class_engagement + sentiment + payment_delayed
    return round(total_risk, 2)

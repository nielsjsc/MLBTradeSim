from sqlalchemy import Column, Integer, String, Float
from ..database import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    team = Column(String)
    status = Column(String)
    year = Column(Float)
    
    # Core Value Metrics
    war = Column(Float)
    base_value = Column(Float)
    contract_value = Column(Float)
    surplus_value = Column(Float)
    
    # Shared Stats with Different Sources
    age_bat = Column(Float)
    age_pit = Column(Float)
    bb_pct_bat = Column(Float)
    bb_pct_pit = Column(Float)
    k_pct_bat = Column(Float)
    k_pct_pit = Column(Float)
    
    # Hitting Only Stats
    avg = Column(Float)
    obp = Column(Float)
    slg = Column(Float)
    woba = Column(Float)
    wrc_plus = Column(Float)
    ev = Column(Float)
    off = Column(Float)
    bsr = Column(Float)
    def_value = Column(Float)
    
    # Pitching Only Stats
    fip = Column(Float)
    siera = Column(Float)
    gb_pct = Column(Float)
    fb_pct = Column(Float)
    stuff_plus = Column(Float)
    location_plus = Column(Float)
    pitching_plus = Column(Float)
    fbv = Column(Float)

    def __repr__(self):
        return f"<Player {self.name}>"
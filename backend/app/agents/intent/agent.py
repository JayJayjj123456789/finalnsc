import re
import logging
from app.models import ParsedIntent

logger = logging.getLogger(__name__)

BUDGET_PATTERNS = [
    r"([0-9,]+)\s*(?:บาท|฿)",
    r"งบ\s*([0-9,]+)",
    r"ราคา\s*([0-9,]+)",
    r"([0-9,]+)\s*กว่าบาท",
]

DURATION_PATTERNS = [
    r"([0-9]+)\s*(?:วัน|day)",
    r"([0-9]+)\s*คืน",
]

TRAVELERS_PATTERNS = [
    r"([0-9]+)\s*(?:คน)",
]

INTEREST_KEYWORDS = {
    "nature": ["ธรรมชาติ", "เขา", "น้ำตก", "ป่า", "ภูเขา", "สวน", "วิว", "เส้นทาง", "ปีนเขา", "เดินป่า", "น้ำตก", "แม่น้ำ", "ทะเลสาบ", "เขาใหญ่", "เขา"],
    "culture": ["วัด", "temple", "พระ", "ประวัติศาสตร์", "โบราณ", "มรดก", "พิพิธภัณฑ์", "เจดีย์", "ศิลปะ", "โคราช", "นครราชสีมา", "ปราสาท", "ขอม"],
    "food": ["อาหาร", "กิน", "ร้านอาหาร", "อร่อย", "ชิม", "ก๋วยเตี๋ยว", "ผัดไท", "ส้มตำ", "ข้าว", "Street Food", "อาหารท้องถิ่น", "ตลาด", "ซูชิ", "สเต็ก", "คาเฟ่", "กาแฟ"],
    "activity": ["เดิน", "ปั่น", "เช่าจักรยาน", "ว่ายน้ำ", "เล่น", "ตกปลา", "กอล์ฟ", "สปา", "ฟิตเนส", "ถ่ายรูป"],
}

RELATIONSHIP_TO_TRAVELERS = {
    "แฟน": 2, "ภรรยา": 2, "สามี": 2, "คู่ครอง": 2,
    "เพื่อนๆ": 3, "เพื่อน": 2,
    "ครอบครัว": 4, "ครอบครัวใหญ่": 6,
    "พ่อแม่": 2, "ลุงป้า": 3, "ปู่ย่า": 4,
}

DESTINATIONS = {
    "นครราชสีมา": ["นครราชสีมา", "โคราช", "korat", "nakhon ratchasima"],
    "เขาใหญ่": ["เขาใหญ่", "khao yai"],
    "พิษณุโลก": ["พิษณุโลก", "phitsanulok"],
    "ขอนแก่น": ["ขอนแก่น", "khon kaen"],
    "อุดรธานี": ["อุดรธานี", "udon thani"],
    "ชลบุรี": ["ชลบุรี", "chonburi", "พัทยา", "pataya"],
    "เชียงใหม่": ["เชียงใหม่", "เชียงราย", "mae hong son"],
    "สุราษฎร์ธานี": ["สุราษฎร์ธานี", "เกาะสมุย", "เกาะพะงัน", "koh samui", "koh phangan"],
    "กระบี่": ["กระบี่", "krabi", "อ่าวนาง"],
    "เพชรบุรี": ["เพชรบุรี", "phetchaburi", "เขาหลัก"],
}

TRAVEL_MODES = {
    "car": ["รถยนต์", "ขับรถ", "รถส่วนตัว", "car"],
    "bus": ["รถบัส", "รถทัวร์", "bus"],
    "train": ["รถไฟ", "train", "rail"],
    "motorbike": ["มอเตอร์ไซค์", "มอเตอร์", "รถจักรยานยนต์", "bike"],
    "van": ["รถตู้", "van"],
}

BUDGET_RANGES = {
    "ประหยัด": (0, 2000),
    "ถูก": (0, 2000),
    "budget": (0, 2000),
    "ปานกลาง": (2000, 5000),
    "normal": (2000, 5000),
    "หรู": (5000, 15000),
    "luxury": (5000, 15000),
    "เซอร์ไพรส์": (3000, 8000),
    "surprise": (3000, 8000),
    "ฟรี": (0, 500),
    "free": (0, 500),
}


class IntentAgent:
    def __init__(self, web_search=None):
        self.web_search = web_search

    async def analyze(self, text: str) -> ParsedIntent:
        logger.info(f"Analyzing intent: {text[:60]}...")

        duration = self._extract_duration(text)
        budget = self._extract_budget(text)
        travelers = self._extract_travelers(text)
        interests = self._extract_interests(text)
        destination = self._extract_destination(text)
        origin = self._extract_origin(text)
        travel_mode = self._extract_travel_mode(text)

        return ParsedIntent(
            duration=duration,
            budget=budget,
            travelers=travelers,
            interests=interests,
            destination=destination,
            origin=origin,
            raw_text=text,
            confidence=0.85,
        )

    def _extract_duration(self, text: str) -> int:
        for pattern in DURATION_PATTERNS:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                val = int(match.group(1))
                if 1 <= val <= 30:
                    return val
        return 3

    def _extract_budget(self, text: str) -> int:
        # Try explicit numbers first
        for pattern in BUDGET_PATTERNS:
            match = re.search(pattern, text)
            if match:
                val = int(match.group(1).replace(",", ""))
                if val > 0:
                    return val
        # Try keyword ranges
        text_lower = text.lower()
        for keyword, (lo, hi) in BUDGET_RANGES.items():
            if keyword in text_lower:
                return hi  # Use upper bound of range
        return 5000

    def _extract_travelers(self, text: str) -> int:
        for pattern in TRAVELERS_PATTERNS:
            match = re.search(pattern, text)
            if match:
                val = int(match.group(1))
                if 1 <= val <= 50:
                    return val
        text_lower = text.lower()
        for keyword, count in RELATIONSHIP_TO_TRAVELERS.items():
            if keyword in text_lower:
                return count
        if "คนเดียว" in text or "เดี่ยว" in text or "solo" in text_lower:
            return 1
        return 2

    def _extract_interests(self, text: str) -> list:
        interests = []
        text_lower = text.lower()
        for category, keywords in INTEREST_KEYWORDS.items():
            for kw in keywords:
                if kw.lower() in text_lower:
                    if category not in interests:
                        interests.append(category)
                    break
        if not interests:
            interests = ["nature"]
        return interests

    def _extract_destination(self, text: str) -> str:
        text_lower = text.lower()
        for province, aliases in DESTINATIONS.items():
            for alias in aliases:
                if alias.lower() in text_lower:
                    return province
        return "นครราชสีมา"

    def _extract_origin(self, text: str) -> str:
        patterns = [
            r"(?:จาก|เริ่มจาก|ออกจาก)\s*([ก-๙a-zA-Z]+)",
            r"อยู่ที่\s*([ก-๙a-zA-Z]+)",
        ]
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(1)
        return "กรุงเทพ"

    def _extract_travel_mode(self, text: str) -> str:
        text_lower = text.lower()
        for mode, keywords in TRAVEL_MODES.items():
            for kw in keywords:
                if kw in text_lower:
                    return mode
        return "car"

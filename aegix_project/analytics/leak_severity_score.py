def calculate_severity(leak):
    if "password" in leak["content"].lower():
        return "High"
    elif "email" in leak["content"].lower():
        return "Medium"
    return "Low"
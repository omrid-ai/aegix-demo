def scan_for_leaks(sources):
    leaks = []
    for source in sources:
        if "dump" in source["content"].lower():
            leaks.append(source)
    return leaks
def link_credentials_to_users(leaks, users):
    linked = []
    for leak in leaks:
        for user in users:
            if user["email"] in leak["content"]:
                linked.append({"user": user["name"], "source": leak["source"]})
    return linked
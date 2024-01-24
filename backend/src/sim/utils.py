def read(source_path):
    with open(source_path, "r", encoding="utf8") as f:
        text = f.read().split("\n\n*****\n\n")
        return text

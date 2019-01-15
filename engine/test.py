import sys
import json

test = sys.argv[1]

print(json.dumps({
    "content": str(test)
}))

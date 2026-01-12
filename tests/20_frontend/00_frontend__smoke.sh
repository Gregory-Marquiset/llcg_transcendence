#!/bin/sh

SELF="${TEST_FILE:-$0}"
NAME="${SELF##*/}"
T_DIR="$(CDPATH= cd -- "$(dirname -- "$SELF")" && pwd)"

ROOT="$T_DIR/.."

LOG_LIB_FILE="$ROOT/lib/lib.sh"
. "$LOG_LIB_FILE"

local_init

https_get "http://localhost:5173" 200

https_get "http://localhost:5173/signUp" 200

https_post v "http://localhost:5173/api/v1/auth/register" 201 "{\"username\":\"test\",\"email\":\"test@test.com\",\"password\":\"1234\"}"

https_get "http://localhost:5173/signIn" 200

https_post v "http://localhost:5173/api/v1/auth/login" 201 "{\"email\":\"test@test.com\",\"password\":\"1234\"}"

local_resume

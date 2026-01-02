
# =========
# Service
# =========

# v -> imprime la reponse

SERVICE_IMAGE_TAG="${SERVICE_IMAGE_TAG:-ci_test_service:latest}"

# Usage: service_rm <name>
service_rm() { docker rm -f "$1" >/dev/null 2>&1 || true; }

# Usage: service_build [v] <context_dir> [tag]
service_build()
{
    if [ "${1:-}" = "v" ]; then
        v="v"
        ctx="$2"
        tag="${3:-$SERVICE_IMAGE_TAG}"
    else
        v="";
        ctx="$1"
        tag="${2:-$SERVICE_IMAGE_TAG}"
    fi

    L_COUNT=$((L_COUNT + 1))
    logs service build "$ctx"

    if [ "$v" = "v" ]; then
        docker build -t "$tag" "$ctx"
    else
        docker build -t "$tag" "$ctx" >/dev/null 2>&1
    fi

    if [ $? -eq 0 ]; then
        ok build ok
        L_OK=$((L_OK+1))
        L_ERRNO=0
        ret
        return 0
    else
        ko build fail
        L_KO=$((L_KO+1))
        L_ERRNO=1
        ret
        return 1
    fi
}

# Usage: service_run [v] <name> <tag> [extra docker run args...]
service_run()
{
    if [ "$1" = "v" ]; then
        v="v"
        name="$2"
        tag="${3:-$SERVICE_IMAGE_TAG}"
        if [ "$#" -ge 3 ]; then shift 3; else shift $#; fi
    else
        v=""
        name="$1"
        tag="${2:-$SERVICE_IMAGE_TAG}"
        if [ "$#" -ge 2 ]; then shift 2; else shift $#; fi
    fi

    L_COUNT=$((L_COUNT + 1))
    logs service run "$name"

    docker rm -f "$name" >/dev/null 2>&1 || true

    if [ "$v" = "v" ]; then
        docker run -d --name "$name" "$@" "$tag"
    else
        docker run -d --name "$name" "$@" "$tag" >/dev/null 2>&1
    fi

    if [ $? -eq 0 ]; then
        ok run ok
        L_OK=$((L_OK+1))
        L_ERRNO=0
        ret
        return 0
    else
        ko run fail
        L_KO=$((L_KO+1))
        L_ERRNO=1
        ret
        return 1
    fi
}

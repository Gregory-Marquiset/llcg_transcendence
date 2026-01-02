
# =========
# Colors, styles et backgrounds (désactivables via NO_ANSI=1)
# =========

if [ "${NO_ANSI:-0}" = "1" ] || [ ! -t 1 ]; then
    ON="";          OFF=""
    RES="";         SEP=""
    BOLD="";        DIM=""
    ITALIC="";      UNDER=""
    BLINK="";       STRIKE=""
    RED="";         GRE=""
    YEL="";         BLU=""
    MAG="";         CYA=""
    BRO="";         BLA=""
    BG_BLACK="";    BG_GRAY=""
    BG_WHITE="";    BG_RED=""
    BG_GREEN="";    BG_BROWN=""
    BG_BLUE="";     BG_MAGENTA=""
    BG_CYAN="";     BG_YELLOW=""
else
    ON="$(printf '\033[')"
    OFF="$(printf 'm')"
    SEP="$(printf ';')"
    RES="$(printf '\033[0m')"

    BOLD="1";       DIM="2"
    ITALIC="3";     UNDER="4"
    BLINK="5";      STRIKE="9"

    RED="31";       LRE="91"
    GRE="32";       LGR="92"
    YEL="93";       BLU="94"
    MAG="95";       CYA="96"
    BRO="33";       BLA="30"

    BG_BLACK="40";  BG_GRAY="100"
    BG_WHITE="107"; BG_RED="41"
    BG_GREEN="42";  BG_BROWN="43"
    BG_BLUE="44";   BG_MAGENTA="45"
    BG_CYAN="46";   BG_YELLOW="103"
fi

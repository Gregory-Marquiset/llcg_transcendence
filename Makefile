# =========
# Makefile  (racine du projet)
# =========

# Utilitaires
SHELL := /bin/sh
PROJECT := cg_transcendence

# Chemin du compose (pas besoin de cd)
COMPOSE := docker compose -f compose/docker-compose.yml

# Par défaut, on cible "gateway" pour les logs/exec ; tu peux surcharger: make logs SERVICE=game
SERVICE ?= gateway

# Cible par défaut
.DEFAULT_GOAL := help

.PHONY: help show show-config up up-fg build down restart logs ps exec sh clean nuke prune check pull

## Affiche l’aide
help:
	@echo ""
	@echo "Commandes disponibles :"
	@echo "  make up         - Build & démarre les services en arrière-plan"
	@echo "  make up-fg      - Démarre en attach (pratique en dev)"
	@echo "  make build      - (Re)build les images"
	@echo "  make down       - Stoppe et supprime les conteneurs"
	@echo "  make restart    - Redémarre proprement (down puis up)"
	@echo "  make logs       - Affiche les logs (SERVICE=...)"
	@echo "  make show       - Liste l’état des services"
	@echo "  make show-config- Liste l’état de la config compose"
	@echo "  make sh         - Shell dans un services (SERVICE=...)"
	@echo "  make exec CMD=… - Exécute une commande dans un service (SERVICE=...)"
	@echo "  make clean      - Down + supprime les volumes du compose"
	@echo "  make prune      - Nettoyage Docker (dangereux si d’autres projets tournent)"
	@echo "  make check      - Vérifie que la gateway répond (http://localhost:8080)"
	@echo "  make pull       - Récupère les images depuis le registre (si applicable)"
	@echo ""

## Affiche l’état actuel des services
show:
	- $(COMPOSE) ls
	- $(COMPOSE) ls -a
	- $(COMPOSE) ps
	- $(COMPOSE) images
	- $(COMPOSE) volumes
	- docker network ls

## Affiche l’état attendu des services
show-config:
	- $(COMPOSE) config --environment
	- $(COMPOSE) config --profiles
	- $(COMPOSE) config --services
	- $(COMPOSE) config --variables
	- $(COMPOSE) config --images
	- $(COMPOSE) config --volumes
	- $(COMPOSE) config --networks

## Build & démarre en détaché
up:
	$(COMPOSE) up -d --build

## Démarre en mode attach (utile pour voir les logs en direct)
up-fg:
	$(COMPOSE) up --build

## (Re)build les images
build:
	$(COMPOSE) build

## Stoppe & supprime les conteneurs
down:
	$(COMPOSE) down

## Redémarre proprement
restart: down up

## Affiche les logs (par défaut: gateway). Exemple: make logs SERVICE=gateway
logs:
	$(COMPOSE) logs -f $(SERVICE)

## Ouvre un shell dans un service (par défaut: gateway). Exemple: make sh SERVICE=gateway
sh:
	$(COMPOSE) exec $(SERVICE) sh

## Exécute une commande dans un service : make exec SERVICE=gateway CMD="nginx -t"
exec:
	@if [ -z "$(CMD)" ]; then echo "Usage: make exec SERVICE=svc CMD=\"...\""; exit 2; fi
	$(COMPOSE) exec $(SERVICE) sh -lc '$(CMD)'

## Down + supprime les volumes du compose (attention aux données locales)
clean:
	$(COMPOSE) down -v

## Nettoyage Docker global (dangereux si tu utilises Docker pour autre chose)
prune:
	@echo "⚠️  Attention: ceci supprime images/volumes réseaux non utilisés."
	docker system prune -af
	docker network prune -f || true

## Vérifie que la gateway répond (port rootless: 8080 -> 80)
check:
	@echo "→ Test http://localhost:8080"
	@wget -qO- http://localhost:8080 | head -n 5 || (echo "❌ Gateway ne répond pas"; exit 1)
	@echo "\n✅ OK"

## Récupère les images depuis le registre (si tu pushes ailleurs)
pull:
	$(COMPOSE) pull

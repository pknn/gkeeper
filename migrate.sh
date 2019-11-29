#! /bin/sh
psql -U gkeeper -f scripts/down.sql
psql -U gkeeper -f scripts/up.sql
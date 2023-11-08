\echo 'Delete and recreate InviApp db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE InviApp;
CREATE DATABASE InviApp;
\connect InviApp

\i invi-schema.sql
\i invi-seed.sql

\echo 'Delete and recreate invi_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE InviApp_test;
CREATE DATABASE InviApp_test;
\connect InviApp_test

\i invi-schema.sql
\i invi-seed.sql
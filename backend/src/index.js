import CreateKnexPool from 'knex';
import schemaInspector from 'knex-schema-inspector';
import express from 'express';
import moment from 'moment';

const app = express();

const knex = CreateKnexPool({
  client: 'pg',
  connection: {
    host : 'localhost',
    port: 5432,
    user : '',
    password : '',
    database : ''
  }
});


const schema = schemaInspector.SchemaInspector(knex)

app.get('/table/:table', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let table = req.params.table
  res.send(JSON.stringify({
    timestamp: moment().unix(),
    rows: await knex.select('*').from(table),
    columns: await schema.columnInfo(table),
  }))
})

app.get('/schema', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify({
    timestamp: moment().unix(),
    tables: await schema.tables(),
  }))
})

app.listen(6969)
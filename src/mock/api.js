import { createServer } from 'miragejs';

const server = createServer({
  routes() {
    this.namespace = 'api';

    this.get('/messages', (schema, request) => {
      let params = request.queryParams;
      Object.keys(params).forEach(
        key => {
          if(!params[key]){
            delete params[key];
          }
        }
      )

      return schema.db.messages.where(params);
    });

    this.post('/message', (schema, request) => {
      return schema.db.messages.insert(request.requestBody);
    });

    this.get('/channels', (schema) => {
      return schema.db.channels;
    });

    this.get('/triggers', (schema) => {
      return schema.db.triggers;
    });

  }
});


server.db.loadData(
  {
    messages: [
      {
        id: 1,
        channel: 'whatsapp',
        trigger: 'falou_atendimento',
        timer: '10:00',
        message: ' Mensagem de teste'
      },
      {
        id: 56,
        channel: 'whatsapp',
        trigger: 'fez_pix',
        timer: '5:00',
        message: ' Mensagem de teste'
      },
      
      {
        id: 9875,
        channel: 'whatsapp',
        trigger: 'comprou_tele_sena',
        timer: '37:00',
        message: 'Deseja deletar essa chave mesmo'
      },
     
    ],
    channels: [
      {
        id: 1,
        name: 'sms'
      },
      {
        id: 2,
        name: 'whatsapp'
      },
      {
        id: 3,
        name: 'email'
      },
      {
        id: 4,
        name: 'Messenger'
      },
      
    ],
    triggers: [
      {
        id: 1,
        name: 'falou_atendimento'
      },
      {
        id: 2,
        name: 'fez_pix'
      },
      {
        id: 3,
        name: 'fez_transferencia'
      },
      {
        id: 4,
        name: 'comprou_tele_sena'
      },
      
      
    
      
    ]
  }
)
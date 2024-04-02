
    module.exports = [
  
    
      {
        method: 'POST',
        path: '/custom-entities',
        handler: 'EntityController.create',
        config: {
          auth: false, 
        },
      },
    
      {
        method: 'GET',
        path: '/custom-entities', 
        handler: 'EntityController.getAll', 
        config: {
          auth: false, 
        },
      },
  
    
      {
        method: 'PUT',
        path: '/custom-entities/:id',
        handler: 'EntityController.update',
        config: {
          auth: false,
        },
      },
    
      {
        method: 'DELETE',
        path: '/custom-entities/:id',
        handler: 'EntityController.delete',
        config: {
          auth: false,
        },
      
      },
    
     
    
    
      
    
    ];
     
    
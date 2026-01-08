// Base Grid Factory para reducir duplicación
Ext.define('ParkingApp.view.BaseGrid', {
    extend: 'Ext.grid.Panel',
    
    initComponent: function() {
        if (this.storeClass) {
            this.store = Ext.create(this.storeClass);
        }
        
        if (!this.tbar && this.entityName) {
            this.tbar = this.createDefaultToolbar();
        }
        
        this.callParent(arguments);
    },
    
    createDefaultToolbar: function() {
        const entityName = this.entityName;
        return [
            { 
                text: 'Add', 
                handler: function() { 
                    Ext.Msg.alert('Info', 'Add ' + entityName); 
                } 
            },
            { 
                text: 'Edit', 
                handler: function() { 
                    Ext.Msg.alert('Info', 'Edit ' + entityName); 
                } 
            },
            { 
                text: 'Delete', 
                handler: function() { 
                    Ext.Msg.alert('Info', 'Delete ' + entityName); 
                } 
            }
        ];
    }
});

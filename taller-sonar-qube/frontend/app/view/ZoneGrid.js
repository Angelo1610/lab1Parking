Ext.define('ParkingApp.view.ZoneGrid', {
    extend: 'ParkingApp.view.BaseGrid',
    alias: 'widget.zonegrid',
    title: 'Zones',
    storeClass: 'ParkingApp.store.Zones',
    entityName: 'Zone',
    
    columns: [
        { text: 'ID', dataIndex: 'id', width: 50 },
        { text: 'Name', dataIndex: 'name', flex: 1 },
        { text: 'Description', dataIndex: 'description', flex: 1 }
    ]
});
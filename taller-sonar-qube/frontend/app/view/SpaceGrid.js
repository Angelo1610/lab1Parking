Ext.define('ParkingApp.view.SpaceGrid', {
    extend: 'ParkingApp.view.BaseGrid',
    alias: 'widget.spacegrid',
    title: 'Spaces',
    storeClass: 'ParkingApp.store.Spaces',
    entityName: 'Space',
    
    columns: [
        { text: 'ID', dataIndex: 'id', width: 50 },
        { text: 'Zone ID', dataIndex: 'zone_id', width: 80 },
        { text: 'Number', dataIndex: 'number', width: 80 },
        { text: 'Status', dataIndex: 'status', width: 100 }
    ]
});
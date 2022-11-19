<Box sx={{ width: "60vw" }}>
      <Grid container 
      
      spacing={{ xs: 2, md: 3 }} columns={
        { xs: 4, sm: 8, md: 12 }}
        >

        {equipmentList.map((equipment) => (<Grid item xs={3} sm={4} md={4} 
        key={`eq${equipment.id}`}>
            <EquipmentCard
                    equipment={equipment}
                    setSelectedItem={setSelectedItem}
                setOpenEditModal={setOpenEditModal}
                />
          </Grid>
        ))}
      </Grid>
      {selectedItem && (
        <Dialog fullScreen open={openEditModal} onClose={() => setOpenEditModal(false)} aria-describedby="alert-dialog-slide-description"
        >

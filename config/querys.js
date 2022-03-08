const querys = {
   //consultas usuarios
    getUsuarios: 
      "SELECT * FROM Usuarios",
    getUsuariosIdGlobal: 
      "exec informacion_usuario_global @idUsuario",
    getUsuarioCorreo: 
      "SELECT * FROM Usuarios WHERE correo=@correo",
    deleteUsuario: 
      "DELETE FROM Usuarios Where idUsuario = @idUsuario",
    addNewUsuario:
      "exec AltaUsuario @nombre, @apellido, @correo, @tipoUsuario, @password",
    updateUsuarioById:
      "UPDATE Usuarios SET nombre = @nombre, apellido = @apellido, direccion = @direccion, fNacimiento= @fNacimiento, telefono = @telefono, correo = @correo, acercaDeMi = @acercaDeMi, linkeidn = @linkeidn WHERE idUsuario = @idUsuario",
    updateEscolarById:
      `UPDATE escolar SET 
       Matricula = @matricula,
       maestria = @maestria, 
       cuatrimestre = @cuatrimestre,
       areasInvestigacion= @areasInvestigacion, 
       nombreProyecto = @nombreProyecto, 
       asesorProyecto = @asesorProyecto, 
       descripcionProyecto = @descripcionProyecto
       WHERE idEscolar = @idEscolar`,
    updateProfesionById:
      `UPDATE profesion SET experienciaProfesional = @experienciaProfesional, proyectosProfesionales = @proyectosProfesionales WHERE idProfesion = @idProfesion`,
    //Consultas nuevas para usuarios
    MostrarUsuariosTipoMTRS:
     "select * from usuarios where tipoUsuario = 'MTRS'",
    MostrarUsuariosTipoALUM:
     "select * from usuarios where tipoUsuario = 'ALUM'",
    //Consultas en habilidades
    addNewHabilidad:
      "exec alta_habilidad @idUsuario, @habilidad",
    deleteHabilidad:
      "exec eliminar_habilidad_usuario @idUsuario, @idHabilidad",
    obtenerHabilidades:
      "exec buscar_habilidad_usuario @idUsuario",
    //Consultas en materias
    addNewMateria:
     "exec alta_materia_profesor @idUsuario, @materia",
    obtenerMaterias:
     "exec buscar_materia_mtrs @idUsuario",
    deleteMaterias: 
     "exec eliminar_materia_mtrs @idUsuario, @idMateria",
    //Alta proyecto editar, crear, y eliminar
    altaProyecto:
     "exec alta_proyecto @idUsuario, @nombre, @descripcion, @areaInvestigacion, @vacante, @fechaInicio, @fechaFinal",
    editarProyecto:
     "exec editar_proyecto  @idProyecto, @idUsuario, @nombre, @descripcion, @areaInvestigacion, @vacante, @fechaInicio, @fechaFinal",
    eliminarProyecto:
     "exec eliminar_proyecto @idProyecto, @idUsuario",
    obtenerTodosLosProyectos:
     "SELECT * FROM proyecto",
    obtenerProyectosGeneradosPorMaestroEspecifico:
     `select idUsuario, U.idProyecto,nombre, descripcion, areaInvestigacion, vacante, fechaInicio, fechaFinal from historialsolicitado H
     inner join proyecto U
     on H.idProyecto = u.idProyecto where H.idUsuario = @idUsuario`,
     //Crear solicitudes
     solicitarProyecto:
      "exec solicitar_proyecto @idUsuario, @idProyecto, @descripcion",
     editarSolicitud:
      "exec editar_solicitud  @idUsuario, @idSolicitar, @idProyecto, @estado, @descripcion",
     eliminarSolicitud:
      "exec eliminar_solicitud  @idUsuario, @idProyecto, @idSolicitar",
    ObtenerSolicitudesDeUnUsuario:
      `select U.idSolicitar ,idProyecto, idUsuario, estado, descipcion from historialsolicitudes H
      inner join Solicitar U
      on U.idSolicitar = H.idSolicitar  where H.idUsuario = @idUsuario`,
    ObtenerSolicitudesDeUnMaestro:
      `select U.idProyecto, U.idSolicitar, U.idUsuario, S.estado, S.descipcion from HistorialSolicitado H
      inner join HistorialSolicitudes U
      on U.idProyecto = H.idProyecto
      inner join Solicitar S
      on U.idSolicitar = S.idSolicitar  where H.idUsuario = @idUsuario`
};

module.exports = querys;
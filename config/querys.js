const querys = {
    getUsuarios: "SELECT * FROM Usuarios",
    getUsuariosId: "SELECT * FROM Usuarios WHERE idUsuario=@idUsuario",
    getUsuarioCorreo: "SELECT * FROM Usuarios WHERE correo=@correo",
    deleteUsuario: "DELETE FROM Usuarios Where idUsuario = @idUsuario",
    addNewUsuario:
      "exec AltaUsuario @nombre, @apellido, @correo, @tipoUsuario, @password",
    updateUsuarioById:
      "UPDATE Usuarios SET nombre = @nombre, apellido = @apellido, direccion = @direccion, fNacimiento= @fNacimiento, telefono = @telefono, correo = @correo, acercaDeMi = @acercaDeMi, linkeidn = @linkeidn WHERE idUsuario = @idUsuario",
};

module.exports = querys;
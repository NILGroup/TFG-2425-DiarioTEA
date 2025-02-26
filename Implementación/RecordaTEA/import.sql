CREATE TABLE Usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Cuidadores(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    rol VARCHAR(10)
);

CREATE TABLE Pictos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    idArasaac INT,
    enlace VARCHAR(200) NOT NULL
);

CREATE TABLE Tarjetas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_picto INT NOT NULL,
    FOREIGN KEY (id_picto) REFERENCES Pictos(id),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

CREATE TABLE Entradas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    autor INT NOT NULL,
    cuerpo TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(1),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

CREATE TABLE Rutinas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    autor INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

CREATE TABLE Rutinas_tarjeta(
    id_rutina INT NOT NULL,
    id_tarjeta INT NOT NULL,
    orden INT NOT NULL,
    PRIMARY KEY(id_rutina, id_tarjeta),
    FOREIGN KEY (id_rutina) REFERENCES Rutinas(id),
    FOREIGN KEY (id_tarjeta) REFERENCES Tarjetas(id)
);

CREATE TABLE Entradas_tarjeta(
    id_entrada INT NOT NULL,
    id_tarjeta INT NOT NULL,
    orden INT NOT NULL,
    PRIMARY KEY (id_entrada, id_tarjeta),
    FOREIGN KEY (id_entrada) REFERENCES Entradas(id),
    FOREIGN KEY (id_tarjeta) REFERENCES Tarjetas(id)
);

CREATE TABLE Cuidadores_Usu(
    id_cuidador INT NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id_cuidador, id_usuario),
    FOREIGN KEY (id_cuidador) REFERENCES Cuidadores(id),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

INSERT INTO Usuarios (id, nombre) 
VALUES ('1', 'Pedro');

INSERT INTO Cuidadores (id, nombre, rol) 
VALUES ('1', 'Lorena', 'Profesora');

INSERT INTO Cuidadores_Usu(id_cuidador, id_usuario)
VALUES ('1', '1')
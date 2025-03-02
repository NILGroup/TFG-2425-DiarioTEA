CREATE TABLE Usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Cuidadores(
    id INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    rol VARCHAR(10),
    FOREIGN KEY (id) REFERENCES Usuarios(id)
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

INSERT INTO Usuarios(id, nombre)
VALUES ('2', 'Lorena');

INSERT INTO Cuidadores (id, nombre, rol) 
VALUES ('2', 'Lorena', 'Profesora');

INSERT INTO Cuidadores_Usu(id_cuidador, id_usuario)
VALUES ('2', '1');


INSERT INTO Pictos (id, idArasaac, enlace) VALUES
(1, 2245, 'https://api.arasaac.org/v1/pictograms/2245'),
(2, 3250, 'https://api.arasaac.org/v1/pictograms/3250'),
(3, 2261, 'https://api.arasaac.org/v1/pictograms/2261'),
(4, 6964, 'https://api.arasaac.org/v1/pictograms/6964');

INSERT INTO Entradas (id, id_usuario, autor, cuerpo, fecha_registro, tipo) VALUES
('1','1', '1', NULL, '2025-03-01 11:30:00', NULL),
('2', '1', '2', 'Progresa adecuadamente', '2025-03-01 10:10:00', NULL);

INSERT INTO Tarjetas (id, id_usuario, id_picto) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3);

INSERT INTO Entradas_tarjeta (id_entrada, id_tarjeta, orden) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3);

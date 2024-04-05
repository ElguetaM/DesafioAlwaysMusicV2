import pool from "../config/db.js";

const dato = process.argv.slice(2);
const option = dato[0];
const nombre = dato[1];
let rut = dato[2];
const curso = dato[3];
const nivel = dato[4];

const showUsers = async () => {
  try {
    const sql = {
      text: "SELECT * FROM Estudiantes",
      rowMode: "array",
    };

    const response = await pool.query(sql);
  } catch (error) {
    console.log(error);
  }
};
const addUser = async (nombre, rut, curso, nivel) => {
  try {
    const sql = {
      text: "INSERT INTO Estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)",
      values: [nombre, rut, curso, nivel],
      rowMode: "array",
    };

    const response = await pool.query(sql);
    console.log(
      `Estudiante ${nombre} agregado exitosamente a la base de datos`
    );
  } catch (error) {
    console.log(error);
  }
};

const searchUser = async (rut) => {
  try {
    const sql = {
      text: "SELECT nombre, rut, curso, nivel FROM Estudiantes WHERE rut = $1",
      values: [rut],
      rowMode: "array",
    };

    const response = await pool.query(sql);
    console.log(`Estudiante encontrado`);
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (nombre, rut, curso, nivel) => {
  try {
    const sql = {
      text: "UPDATE Estudiantes SET nombre = $1, rut = $2, curso = $3, Nivel = $4 WHERE RUT = $2",
      values: [nombre, rut, curso, nivel],
      rowMode: "array",
    };

    const response = await pool.query(sql);
    console.log(`Base de datos actualizada para el estudiante ${nombre}`);
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (rut) => {
  try {
    const sql = {
      test: "DELETE FROM Estudiantes WHERE rut = $1",
      values: [rut],
      rowMode: "array",
    };

    const response = await pool.query(sql);
    console.log(`Estudiante con rut${rut} eliminado de la base de datos`);
  } catch (error) {
    console.log(error);
  }
};

if (option === "add") {
  addUser(nombre, rut, curso, nivel);
} else if (option === "show") {
  showUsers();
} else if (option === "search") {
  rut = dato[1];
  searchUser(rut);
} else if (option === "update") {
  updateUser(nombre, rut, curso, nivel);
} else if (option === "delete") {
  rut = dato[1];
  deleteUser(rut);
} else {
  console.log("Opción inválida");
}

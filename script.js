body {
  font-family: Arial, sans-serif;
  background-color: #f0f8ff;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #004080;
}

.malla {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 10px;
}

.ciclo {
  min-width: 220px;
  background-color: #e6f2ff;
  border: 2px solid #a3c2f0;
  border-radius: 10px;
  padding: 10px;
}

.ciclo h2 {
  text-align: center;
  color: #003366;
}

.ramo {
  margin: 8px 0;
  padding: 10px;
  background-color: #ffffff;
  border: 2px solid #b3d1ff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  text-align: center;
}

.ramo.bloqueado {
  background-color: #f0f0f0;
  color: #999;
  border-style: dashed;
  cursor: not-allowed;
}

.ramo.aprobado {
  text-decoration: line-through;
  background-color: #d1ffd1;
  border-color: #66cc66;
  color: #003300;
}


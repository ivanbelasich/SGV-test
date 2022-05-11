import React from "react";
import DataTable from "react-data-table-component";
import { data } from "./data";
import "./principal.css";

export const Principal = () => {
  const columns = [
    { name: "id", selector: (row) => row.id, sortable: true },
    {
      name: "EstadoERP",
      selector: (row) => row.EstadoERP,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.EstadoERP === "Aprobado",
          style: {
            backgroundColor: "green",
            color: "white",
          },
        },
        {
          when: (row) => row.EstadoERP === "Anulado",
          style: {
            backgroundColor: "#ba1717",
            color: "white",
          },
        },
        {
          when: (row) => row.EstadoERP === "Finalizado",
          style: {
            backgroundColor: "#044d82",
            color: "white",
          },
        },
      ],
    },
    {
      name: "TipoDocumento",
      selector: (row) => row.TipoDocumento,
      sortable: true,
    },
    {
      name: "NombreCliente",
      selector: (row) => row.NombreCliente,
      sortable: true,
    },
    { name: "NoLineas", selector: (row) => row.NoLineas, sortable: true },
    { name: "FechaPedido", selector: (row) => row.FechaPedido, sortable: true },
    { name: "Pedido", selector: (row) => row.Pedido, sortable: true },
    { name: "EstadoSiesa", selector: (row) => row.EstadoSiesa, sortable: true },
    { name: "PedidoSiesa", selector: (row) => row.PedidoSiesa, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="delete-button"
          type="button"
          title="Delete"
          onClick={() => handleDeleteClick(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  const [fields, setFields] = React.useState(data);

  //////////////////////                 ADD FORM                 //////////////////////

  const [addFormData, setAddFormData] = React.useState({
    EstadoERP: "",
    TipoDocumento: "",
    NombreCliente: "",
    NoLineas: "",
    FechaPedido: "",
    Pedido: "",
    EstadoSiesa: "",
    PedidoSiesa: "",
  });

  const handleAddFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    const newField = {
      id: fields.length,
      EstadoERP: addFormData.EstadoERP,
      TipoDocumento: addFormData.TipoDocumento,
      NombreCliente: addFormData.NombreCliente,
      NoLineas: addFormData.NoLineas,
      FechaPedido: addFormData.FechaPedido,
      Pedido: addFormData.Pedido,
      EstadoSiesa: addFormData.EstadoSiesa,
      PedidoSiesa: addFormData.PedidoSiesa,
    };
    const newFields = [...fields, newField];
    setFields(newFields);
    e.target.reset();
  };

  //////////////////////                 DELETE                 //////////////////////

  const handleDeleteClick = (fieldId) => {
    const newFields = [...fields];

    const index = fields.findIndex((el) => el.id === fieldId);

    newFields.splice(index, 1);
    setFields(newFields);
  };

  return (
    <>
      <div className="table-container">
        <DataTable
          title="SGV Software"
          striped
          highlightOnHover
          columns={columns}
          data={fields}
          pagination
          responsive
        />
      </div>
      <div className="form-container">
        <form className="form" onSubmit={handleAddFormSubmit}>
          <p>
            <label>Estado ERP</label>
            <input
              type="text"
              name="EstadoERP"
              onChange={handleAddFormChange}
              placeholder="Estado RP"
              required
            />
          </p>
          <p>
            <label>Tipo Documento</label>
            <input
              type="text"
              name="TipoDocumento"
              onChange={handleAddFormChange}
              placeholder="Tipo Documento"
              required
            />
          </p>
          <p>
            <label>Nombre Cliente</label>
            <input
              type="text"
              name="NombreCliente"
              onChange={handleAddFormChange}
              placeholder="Nombre Cliente"
              required
            />
          </p>
          <p>
            <label>N° Lineas</label>
            <input
              type="number"
              name="NoLineas"
              onChange={handleAddFormChange}
              placeholder="N° Lineas"
              required
            />
          </p>
          <p>
            <label>Fecha Pedido</label>
            <input
              type="text"
              name="FechaPedido"
              onChange={handleAddFormChange}
              placeholder="Fecha Pedido"
              required
            />
          </p>
          <p>
            <label>Pedido</label>
            <input
              type="number"
              name="Pedido"
              onChange={handleAddFormChange}
              placeholder="Pedido"
              required
            />
          </p>
          <p>
            <label>Estado Siesa</label>
            <input
              type="number"
              name="EstadoSiesa"
              onChange={handleAddFormChange}
              placeholder="Estado Siesa"
              required
            />
          </p>
          <p>
            <label>Pedido Siesa</label>
            <input
              type="text"
              name="PedidoSiesa"
              onChange={handleAddFormChange}
              placeholder="Pedido Siesa"
              required
            />
          </p>
          <div className="button-container">
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

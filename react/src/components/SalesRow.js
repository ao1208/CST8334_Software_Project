function SalesRow({ record }) {
  return (
    <tr>
      {Object.keys(record).map((column) => {
        return <td key={column}>{record[column]}</td>;
      })}
    </tr>
  );
}

export default SalesRow;

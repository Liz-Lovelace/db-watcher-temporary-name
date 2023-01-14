import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import React, { useState } from 'react';
import "ka-table/style.css";

export default function DBTable({columns, rows}){
  const dataArray = rows.map(
    (row, index) => ({
      ...row,
      id: index,
    }),
  );

  // initial value of the *props
  const tablePropsInit: ITableProps = {
    columns: columns.map(column => ({ 
      key: column.name,
      title: column.name,
      // TODO: make this dynamic
      dataType: DataType.String,
      isResizable: true,
      colGroup: {style: {minWidth: 30}},
      width: 100,
    })),
    data: dataArray,
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,
    columnReordering: true,
  };

  // in this case *props are stored in the state of parent component
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = (action) => { // dispatch has an *action as an argument
    // *kaReducer returns new *props according to previous state and *action, and saves new props to the state
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps} // ka-table UI is rendered according to props
      dispatch={dispatch} // dispatch is required for obtain new actions from the UI
    />
  );
}
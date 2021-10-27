/**
 *
 * ExportExcel
 *
 */
import { ExportIcon } from 'app/components/Icons';
import React, { memo } from 'react';
import { Button } from 'reactstrap';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
interface Props {
  csvData: Array<any>;
  fileName: string;
}

export const ExportExcel = memo((props: Props) => {
  const { csvData, fileName } = props;

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button color="success" onClick={() => exportToCSV(csvData, fileName)}>
      <ExportIcon />
      <span style={{ marginLeft: '10px' }}>엑셀 다운로드</span>
    </Button>
  );
});

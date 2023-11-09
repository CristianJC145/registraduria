import React, { useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter  } from 'react-table';

import AppIcon from '../AppIcon';
import AppButton from '../Buttons/AppButton';

interface AppDataTableProps {
    columns: any[];
    data: any[];
    className? : string;
}

const AppDataTable: React.FC<AppDataTableProps> = ({columns, data, className}) => {
    if (data.length === 0) {
        return <div>Cargando...</div>;
    }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        rows,
        prepareRow,
        state: {pageIndex, pageSize},
        gotoPage,
        setPageSize,
        canPreviousPage,
        globalFilter,
        setGlobalFilter,
        pageCount,
        canNextPage,
        previousPage,
        nextPage,
        pageOptions
    } = useTable(
        {
            columns,
            className,
            data,
            initialState : { pageIndex: 0, pageSize: 10 }
        },
        useGlobalFilter,
        useSortBy, 
        useGlobalFilter, 
        usePagination
    );
    const [search, setSearch] = useState(globalFilter || '');
    const firstRecord = rows.length === 0 ? 0 : pageIndex * pageSize + 1;
    const lastRecord = Math.min((pageIndex + 1) * pageSize, rows.length);
    
    useEffect(() => {
        const delayDebounceFn = setTimeout(() =>{
            setGlobalFilter(search || undefined);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search, setGlobalFilter]);
    
    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <section className="vs-section-search-bar px-0">
                    <div className='vs-search-bar py-0 shadow-sm col-12 col-sm-6 col-lg-3'>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                        />
                        <AppButton icon="search" variant='dark' className='cursor-pointer'></AppButton>
                    </div>
                </section>
                <div className='d-flex gap-2 text-nowrap align-items-center' style={{color : 'var(--color-gray-300)'}}>
                    <span className='d-none d-md-block'>Filas por Página</span>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className='form-select ms-4 ms-sm-0 me-1 me-sm-0'
                        style={{padding : '0.675rem var(--p-8) 0.675rem var(--p-4)' }}
                        >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>   
            </div>
            <div className='overflow-auto'>
                <table {...getTableProps()} className='vs-dataTable'>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column:any) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className={column.HeaderClassName}
                                    >
                                        {column.render('Header')}
                                        {!column.disableSortBy && (
                                            <>
                                                {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <AppIcon className="ms-2" icon='sort-down'></AppIcon>
                                                ) : (
                                                    <AppIcon className="ms-2" icon='sort-up'></AppIcon>
                                                )
                                                ) : (
                                                    <AppIcon className="ms-2" icon='sort'></AppIcon>
                                                )}
                                            </>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {rows.length === 0 ? (
                        <tbody>
                            <tr>
                                <td colSpan={6} >
                                    <h3 className="text-center">No se encontraron resultados.</h3>
                                </td>
                            </tr>
                        </tbody>
                    ) : (                             
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell: any) => {
                                            return (
                                                <td
                                                    {...cell.getCellProps({className : cell.column.className})} 
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    )} 
                </table>
            </div>
            <div className='d-flex align-items-center justify-content-between flex-column flex-md-row gap-3 mt-3'>
                <div className='d-flex align-items-center gap-1 gap-sm-3'>
                    <AppButton onClick={() => gotoPage(0)} disabled={!canPreviousPage} icon={'angle-double-left'} variant='dark'></AppButton>
                    <AppButton onClick={() => previousPage()} disabled={!canPreviousPage} icon={'angle-left'} variant='dark'></AppButton>
                    <div className='d-flex gap-2 gap-sm-4'>
                        {pageOptions.map((page, index) => (
                            <AppButton
                                key={index}
                                onClick={() => gotoPage(index)}
                                disabled={pageIndex === index}
                                label={`${index + 1}`}
                                className={`py-2 px-3 ${pageIndex ===page ? 'text-white' : 'text-dark'}`}
                                variant={pageIndex === page ? 'primary' : 'white'}
                            >
                            </AppButton>
                        ))}
                    </div>
                    <AppButton onClick={() => nextPage()} disabled={!canNextPage} icon={'angle-right'} variant='dark'></AppButton>
                    <AppButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} icon={'angle-double-right'} variant='dark'></AppButton>
                </div>

                <span style={{color : 'var(--color-gray-300)'}}>
                    Mostrando {firstRecord} de {lastRecord} de {rows.length}
                </span>    
            </div>
        </>
    )
}
export default AppDataTable;

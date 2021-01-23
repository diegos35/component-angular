import { Component, OnInit, Input, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TerceroService } from  '../tercero.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-tercero',
  templateUrl: './tercero.component.html',
  styleUrls: ['./tercero.component.css']
})
export class TerceroComponent implements OnInit, OnDestroy, AfterViewInit {

	@ViewChild(DataTableDirective, { static: false })
	dtElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();


	@Input() elemento: any; //elemento de las listas
	@Input() componente: any;
	@Input() etiqueta: any;
	private modal;
	public tipo_lista_id: any = null;
	public data;
	public lista_tipo_id;

	constructor(private modalService: NgbModal,
		private _TerceroService: TerceroService
	) { 

	}

	ngOnInit(): void {
		this.cargarTabla();
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		// Hay que dessuscribirse del evento dtTrigger, para poder recrear la tabla.
		this.dtTrigger.unsubscribe();
	}

	/*
  *Función que renderiza el datatable
  */
	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destruimos la tabla
			dtInstance.destroy();
			// dtTrigger la reconstruye
			this.dtTrigger.next();

		});
	}

	cargarTabla(): void {

		const that = this;
	
		this.dtOptions = {
			ajax: {
				'url': ('http://127.0.0.1:8000/api/data/'),
				'type': 'POST',
				complete(res){
					that.data = res.responseJSON.data;
					that.lista_tipo_id = res.responseJSON.tipo_lista_id;
				}
			},

			columns: [
			{
				className: 'text-left',
				title: 'Departamento',
				data: 'nombre'
			},
			{
				className: 'text-left',
				title: 'Municipio',
				data: 'descripcion'
			},
			{
				className: 'text-left',
				title: 'Identificacion',
				data: 'identificacion'
			},
			{
				className: 'text-left',
				title: 'Nombres',
				data: 'nombre'
			},
			{
				className: 'text-left',
				title: 'Tipo tercero',
				data: 'tipo_tercero'
			},
			],
			columnDefs: [{
				targets: 6, //posición de la columna donde estara el boton
				className: "text-center",
				orderable: false,
				searchable: false,
				defaultContent: "<button type='button' class='editar btn btn-primary' title='Editar'><i class='fa fa-pencil-square-o'></i></button>",
			
			},
			{
				targets: 7, //posición de la columna donde estara el boton
				className: "text-center",
				orderable: false,
				searchable: false,
				defaultContent: "<button type='button' class='eliminar btn btn-danger' data-toggle='modal' title='Eliminar'><i class='fa fa-trash-o'></i></button>"

			}],
			rowCallback: (row, data, index) => {
				const self = this;
				// Unbind first in order to avoid any duplicate handler
				$('.editar', row).unbind('click');
				$('.editar', row).bind('click', () => {
					self.editar(data);
				});
				$('.eliminar', row).unbind('click');
				$('.eliminar', row).bind('click', () => {
					self.eliminar(data);
				});
				return row;
			  },
		};
	}

	openModal() {
		// this.modal = this.modalService.open(FormComponent, {
		// 	size: 'md',
		// 	backdrop: 'static',
		// 	keyboard: false
		// });
		this.modal.componentInstance.lista_tipo_id = this.lista_tipo_id;
		this.modal.result.then(
            (result) => {
				
                this.modal = null;
                this.rerender();
            }
        );
	}




	private eliminar(data: any): void {
		let id = data.id;
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		  }).then((result) => {
			if (result.isConfirmed) {
				this._TerceroService.delete(id).subscribe((data)	=> {
					Swal.fire(
						'Deleted!',
						'Your file has been deleted.',
						'success'
					  );
						}, (error)	=>	{
							console.log(error);
						});
						this.rerender();
			}
		  })
	}

	
	private editar(data: any): void {
			this.openModal();
			this.modal.componentInstance.id = data.id;
			this.modal.componentInstance.tipoLista = this.tipo_lista_id;
	
	}

}

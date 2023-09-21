<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-balham.css";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: {
      AgGridVue,
      VueDatePicker,
  },

  data(){
    return{
      loading: false,
      success: false,
      error: false,
      errMsg: "",
      popupErrMsg: "",
      overlay: false,
      company_store:[],
      business_store:[],
      dateformat: '',
      search: {
        company: "",
        business: "",
        yyyymm: "",
        date: {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
      },
      file:{
        documentIO: null,
        documentOut: null,
      },


      adt: {
        gridOptions: null,
        gridApi: null,
        columnApi: null,
        defaultColDef: {
            resizable: true,
            editable: false,
            minWidth: 50,
            width: 100,
            
        },
        columnDefs: [
            { headerName: "No.", field: "No.", valueGetter: 'node.rowIndex + 1', maxWidth: 50, },
            { headerName: "근태기준일", field: "workDate", sortable: true, filter: true, },
            { headerName: "사업장", field: "estName",  },
            { headerName: "부서명", field: "departmentName", },
            { headerName: "사원번호", field: "employeeNumber", sortable: true, filter: true,  },
            { headerName: "사원명", field: "koreanName", sortable: true, filter: true,  },
            { headerName: "직급", field: "definedName",  },
            { headerName: "근무형태", field: "workStatus" },
            { headerName: "출근일시", field: "workStartDate", width:150, },
            { headerName: "퇴근일시", field: "workEndDate", width:150, },
            { headerName: "출근판정", field: "inStatus",  },
            { headerName: "퇴근판정", field: "outStatus",  },
            { headerName: "외출", field: "outTime" },
            { headerName: "지각", field: "lateTime" },
            { headerName: "연장근무시간", field: "overTime" },
            { headerName: "야간근무시간", field: "nightTime" },
            { headerName: "휴일", field: "holidayTime" },
            { headerName: "정상근무시간", field: "defaultTime" },
            { headerName: "실제근무시간", field: "realWorkTime" },
        ],
        rowData: [],
      },
    }
  },

  mounted(){
    this.setSelectBox();
    
    this.dateformat = (date) => {
      let month = date.getMonth() + 1;
      if(month < 10){
        month = "0" + month;
      }
      let year = date.getFullYear();
      return `${year}/${month}`;
    };
  },


  methods: {
    onGridReady(params){
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      // this.gridApi.sizeColumnsToFit();
    },

    setSelectBox(){
        //회사 selectBox
        this.axios.post("/api/v1/hr/getCompanyList", {
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => {
            if(res.data.success){
              this.company_store = res.data.data;
              this.search.company = this.company_store[0];
            }else {
              this.errMsg = res.data.message;
              this.error = true;
            }
        }).catch((error => {
            console.log(error);
            this.errMsg = error.message;
            this.error = true;
        }));

        //사업장 selectBox
        this.axios.post("/api/v1/hr/getBusinessList", {
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => {
            if(res.data.success){
              this.business_store = res.data.data;
              this.search.business = this.business_store[0];
            }else {
              this.errMsg = res.data.message;
              this.error = true;
            }
        }).catch((error => {
            console.log(error);
            this.errMsg = error.message;
            this.error = true;
        }));
    },

    setDateFormat(){
      if(this.search.date.month < 9){
        this.search.yyyymm = this.search.date.year + "0" + (this.search.date.month+1);
      }else if(this.search.date.month >= 9){
        this.search.yyyymm = this.search.date.year + "" + (this.search.date.month+1);
      }
    },

    getSearchList(){
      this.setDateFormat();
      let sendData = {
        companyId: this.search.company.value,
        estId: this.search.business.value,
        yyyymm: this.search.yyyymm
      };

        this.loading = true;
        this.axios.post("/api/v1/hr/getAdtList", sendData, {
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => {
            if(res.data.success){
              if(res.data.data.length === 0){
                this.loading = false;
                this.errMsg = "데이터가 없습니다.";
                this.error = true;
              }else{
                this.adt.rowData = res.data.data;
                this.loading = false;
              }
            }else {
              this.loading = false;
              this.errMsg = res.data.message;
              this.error = true;
            }
        }).catch((error => {
            this.loading = false;
            console.log(error);
            this.errMsg = error.message;
            this.error = true;
        }));

    },

    chkDocumentIO(value){
      const allowedFileType= /(\.csv|\.xlsx|\.xls)$/i;

      if(!value){
        this.popupErrMsg = "출퇴근은 필수 항목입니다.";
      }else if(value.length === 0){
        this.popupErrMsg = "출퇴근은 필수 항목입니다.";
      }else if(!allowedFileType.test(value[0].name)){
        this.popupErrMsg = "올바른 파일 형식(csv, xlsx, xsl)이 아닙니다."
      }else return true;

      return false;
    },

    chkDocumentOut(value){
      const allowedFileType= /(\.csv|\.xlsx|\.xls)$/i;

      if(!value){
      ;
      }else if(value.length != 0){
        if(value[0].name !=undefined){
          if(!allowedFileType.test(value[0].name)){
            this.popupErrMsg = "올바른 파일 형식(csv, xlsx, xsl)이 아닙니다."
            return false;
          }
        }
      }
      return true;
    },

    formValidation(){

      if(!this.chkDocumentIO(this.file.documentIO))
      ;
      else if(!this.chkDocumentOut(this.file.documentOut))
      ;
      else{
        return true;
      }

      return false;
    },

    uploadExcel(){
      this.overlay = true;
      this.setDateFormat();
      if(this.formValidation()){
        let file01 = this.file.documentIO[0];
        let file02 = new Object();
        if(this.file.documentOut != null && this.file.documentOut != undefined && this.file.documentOut!= ""){
          file02 = this.file.documentOut[0];
        }
        var frm = new FormData();
        frm.append('file01', file01);
        frm.append('file02', file02);
        frm.append('yyyymm', this.search.yyyymm);

          this.loading = true;
          this.axios.post(encodeURI("/api/v1/hr/uploadADTExcel/"), frm, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
            if (res.data.success) {
              this.popupErrMsg = '';
                this.overlay = false;
                this.loading = false;
                this.success = true;
                this.file.documentIO = null;
                this.file.documentOut = null;
            }else {
              this.popupErrMsg = res.data.message;
              this.loading = false;
            }
          }).catch((error => {
              this.loading = false;
              this.popupErrMsg = error.message;
          }));
      }else{
        this.popupErrMsg = '업로드중 오류가 발생하였습니다.';
      }
    },

    closePopup(){
      this.overlay = false;
      this.popupErrMsg = null;
      this.file.documentIO = null;
      this.file.documentOut = null;
    },

    getErpIU(){
      this.setDateFormat();
      let sendData = {
        companyId: this.search.company.value,
        estId: this.search.business.value,
        yyyymm: this.search.yyyymm
      };
      this.loading = true;
      this.axios.post("/api/v1/hr/erpiu/getDataErpIU", sendData, {
          headers: {
              "Content-type": "application/json",
          },
      })
      .then((res) => {
          if(res.data.success){
            this.loading = false;
            this.success = true;
            this.getSearchList();
          }else {
            this.loading = false;
            this.errMsg = res.data.message;
            this.error = true;
          }
      }).catch((error => {
          this.loading = false;
          console.log(error);
          this.errMsg = error.message;
          this.error = true;
      }));
    },
  }
}

</script>


<template>
  <v-container>
    <v-overlay
      class="align-center justify-center"
      persistent
      v-model="loading"
      >
      <v-progress-circular
        color="primary"
        indeterminate
        :size="100"
        :width="12"
      ></v-progress-circular>
    </v-overlay>
    <v-overlay
      class="align-center justify-center"
      v-model="success"
      >
      <v-alert color="primary" text="작업 완료되었습니다." >
      </v-alert>
    </v-overlay>
    <v-overlay
      class="align-center justify-center"
      v-model="error"
      >
      <v-alert color="error" :text= errMsg >
      </v-alert>
    </v-overlay>
      <div class="d-flex align-center mb-7">
        <div class="bg-primary-lighten-5 px-3 py-2 rounded me-3">
          <i class="tio- text-primary text-20">shopping</i>
        </div>
        <div class="text-20 f-600">ADT 근태 관리</div>
      </div>
      <v-row>
        <v-col cols="12">
            <v-row class="align-center mb-2">
              <v-col cols="3">
                <v-select
                  class="mw-200 px-3"
                  label="회사"
                  variant="outlined"
                  :items="company_store"
                  item-title="name"
                  item-value="value"
                  v-model="search.company"
                  return-object
                  hide-details="">
                </v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  class="mw-200 px-3"
                  label="사업장"
                  variant="outlined"
                  :items="business_store"
                  item-title="name"
                  item-value="value"
                  v-model="search.business"
                  return-object
                  hide-details="">
                </v-select>
              </v-col>
              <v-col cols="4">
                <VueDatePicker
                  class="v-input__control"
                  v-model="search.date"
                  :format="dateformat"
                  mode-height="190"
                  month-picker>
                </VueDatePicker>
              </v-col>
              <v-col cols="2" class="pr-10">
                <v-btn color="primary" flat class="grid-btn-wrap" width="100" height="40" @click="getSearchList">
                  <span class="text-20">조회</span>
                </v-btn>
              </v-col>
            </v-row>
        </v-col>
      </v-row>
      <!-- 구분선 --><hr class="my-5 mr-5">
      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="2">
            <v-btn color="primary" flat @click="getErpIU" width="150" height="40">
              <span class="text-16">사원정보</span><span class="text-13">(ERP IU)</span>
            </v-btn>         
        </v-col>
        <v-col cols="2">
            <v-btn color="primary" flat class="detail-search" @click="searchShow=true" width="150" height="40">
              <span class="text-16">ADT 업로드</span>
            </v-btn>
            <v-overlay
            activator="parent"
            location-strategy="connected"
            persistent
            v-model="overlay"
            >
              <v-card class="excel-card">
                <h4 class="ma-3 text-subtitle-2 font-weight-bold">엑셀 업로드</h4>
                <v-divider></v-divider>
                <v-row>
                    <v-col>
                      <v-row class="ma-5">
                        <v-file-input 
                          label="출퇴근*"
                          v-model="file.documentIO"
                          variant="outlined" 
                          prepend-icon="tio-file_add"
                          accept=".csv, 
                          application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                          application/vnd.ms-excel"></v-file-input>
                      </v-row>
                      <v-row class="ma-5">
                        <v-file-input 
                          label="외출"
                          v-model="file.documentOut"
                          variant="outlined" 
                          prepend-icon="tio-file_add"
                          accept=".csv, 
                          application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                          application/vnd.ms-excel"></v-file-input>
                      </v-row>
                      <v-alert v-if="popupErrMsg"
                        color="error"
                        theme="dark"
                        border="start"
                        prominent
                        class="mx-5"
                      >
                        <i class="tio- text-18 me-2"> error_outlined </i>
                        {{ popupErrMsg }}
                      </v-alert>
                    </v-col>
                </v-row>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="closePopup"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="uploadExcel"
                >
                    Upload
                </v-btn>
                </v-card-actions>
              </v-card>
            </v-overlay>
        </v-col>
      </v-row>
      <v-row class="grid-wrap">
        <v-col cols="12">
            <!--adt table-->
            <ag-grid-vue
            style="height: 700px"
            class="ag-theme-balham"
            :columnDefs="adt.columnDefs"
            :defaultColDef="adt.defaultColDef" 
            :rowData="adt.rowData"
            @grid-ready="onGridReady"
            >
            </ag-grid-vue>
        </v-col>
      </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.grid-btn-wrap {
    float: right;
}

.excel-card{
  width:30rem;
}

.close-btn {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    &:hover {
      color: #6366f1;
      cursor: pointer;
    }
  }

.grid-wrap {
    flex-wrap: nowrap;
    width: 100%;
}

</style>
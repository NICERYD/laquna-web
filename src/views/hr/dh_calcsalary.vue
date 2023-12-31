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
      successMsg: "",
      error: false,
      errMsg: "",
      uploadPopup: false,
      file: null,
      company_store:[],
      business_store:[],
      payrollSort:[{value:"Est", name:"지사별"}, {value:"All", name:"개인별"}],
      sort:[{value:"Salary", name:"급여"}, {value:"Bonus", name:"상여"}],
      search: {
        company: "",
        business: "",
        yyyymm: "",
        date: {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
        koreanName: "",
        payrollSort: "",
        sort:"",
      },
      dateformat: '',
      pay_calculate: {
        gridOptions: null,
        gridApi: null,
        columnApi: null,
        defaultColDef: {
            resizable: true,
            editable: true,
            headerClass: "centered",
            minWidth: 50,
            width: 100,
        },
        columnDefs: [
            { headerName: "", headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 50, },
            { field: "salaryId", hide: true},
            { field: "residentRegistrationNumber", hide: true},
            { field: "emailAddress", hide: true},
            { headerName: "사원코드", field: "employeeNumber", editable: false, minWidth: 80, sortable: true, filter: true, },
            { headerName: "사원명", field: "koreanName", editable: false, minWidth: 60, sortable: true, filter: true,},
            { headerName: "사업장", field: "estName", editable: false, minWidth: 90, },
            { headerName: "부서", field: "departmentName", editable: false, },
            { headerName: "직급", field: "definedName", editable: false, },
            {
              headerName: '수당',
              children: [
                { headerName: "기본급", field: "basicSalary", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn'},
                { headerName: "연차수당", field: "annualAllowance", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "연장수당1", field: "overtimeAllowance01", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn'},
                { headerName: "연장수당2", field: "overtimeAllowance02", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "야간수당1", field: "nightAllowance01", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "야간수당2", field: "nightAllowance02", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "휴일수당1", field: "holidayAllowance01", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "휴일수당2", field: "holidayAllowance02", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "직책수당", field: "positionAllowance", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "기타수당1", field: "otherAllowance01", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "기타수당2", field: "otherAllowance02", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "보조금", field: "subsidies", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "교통비", field: "transportationExpenses", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "식대", field: "mealsExpenses", valueFormatter:'Number(value).toLocaleString()', type:'numericColumn' },
                { headerName: "지급액계", field: "salarySum", editable: false, valueFormatter:'Number(value).toLocaleString()', type:'numericColumn'},
              ],
            },
        ],
        rowData: [],
        isRowSelectable: (rowNode) => {
          return rowNode.data ? rowNode.data.employeeNumber != "합계" : false;
        },
      },

      editedRows:[],

      dialog: false,
      selectedRows: [],

      email_grid: {
        gridOptions: null,
        gridApi: null,
        columnApi: null,
        defaultColDef: {
            resizable: true,
            editable: true,
            headerClass: "centered",
        },
        columnDefs: [
            { headerName: "", headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 40, minWidth:40, },
            { field: "residentRegistrationNumber", hide: true},
            { headerName: "사원코드", field: "employeeNumber", editable: false, minWidth: 80, maxWidth: 80, },
            { headerName: "사원명", field: "koreanName", editable: false, minWidth: 70, maxWidth: 80 },
            { headerName: "사업장", field: "estName", editable: false, minWidth: 90, },
            { headerName: "부서", field: "departmentName", editable: false, },
            { headerName: "직급", field: "definedName", editable: false, minWidth: 60, maxWidth: 80 },
            { headerName: "E-mail", field: "emailAddress", editable: false, minWidth: 120 },
        ],
        rowData: [],
      }
    }
  },

  mounted(){
    //검색 조건 default setting
    this.setSelectBox();  

    //VueDatePicker custom setting
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
    onPayGridReady(params){
      this.pay_calculate.gridApi = params.api;
      this.pay_calculate.columnApi = params.columnApi;
    },

    onEmailGridReady(params){
      this.email_grid.gridApi = params.api;
      this.email_grid.columnApi = params.columnApi;
      this.email_grid.gridApi.sizeColumnsToFit();

      //전체 row setSelected
      this.email_grid.gridApi.forEachNode(node => {
        node.setSelected(true);
      });
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

        //급여,상여 구분 selectBox
        this.search.sort = this.sort[0];

        //레포트 분류 selectBox
        this.search.payrollSort = this.payrollSort[0];
    },

    //VueDatePicker month 값 2자리로 setting
    setDateFormat(){
      if(this.search.date.month < 9){
        this.search.yyyymm = this.search.date.year + "0" + (this.search.date.month+1);
      }else if(this.search.date.month >= 9){
        this.search.yyyymm = this.search.date.year + "" + (this.search.date.month+1);
      }
    },

    // getBasicSalaryData(){
    //   this.setDateFormat();
    //   let sendData = {
    //     companyId: this.search.company.value,
    //     estId: this.search.business.value,
    //     yyyymm: this.search.yyyymm
    //   };

    //     this.loading = true;
    //     this.axios.post("/api/v1/hr/erpiu/getBasicSalaryData", sendData, {
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //     })
    //     .then((res) => {
    //         if(res.data.success){
    //           this.loading = false;
    //           this.successMsg = "급여항목가져오기 완료";
    //           this.success = true;
    //           console.log(res.data.message);
    //         }else {
    //           console.log(res.data.message);
    //           this.loading = false;
    //           this.errMsg = res.data.message;
    //           this.error = true;
    //         }
    //     }).catch((error => {
    //         this.loading = false;
    //         console.log(error);
    //         this.errMsg = error.message;
    //         this.error = true;
    //     }));
    // },

    //조회 버튼
    getSearchList(){
      this.setDateFormat();
      let sendData = {
        companyId: this.search.company.value,
        estId: this.search.business.value,
        yyyymm: this.search.yyyymm,
        koreanName: this.search.koreanName,
        sort: this.search.sort.value
      };

        this.loading = true;
        this.axios.post("/api/v1/hr/getCalcSalaryList", sendData, {
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => {
            if(res.data.success){
              this.loading = false;
              this.pay_calculate.rowData = res.data.data;
            }else {
              console.log(res.data.message);
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

    //grid 값 수정시 event
    onCellValueChanged(params){
      let editedColumnId = params.data.salaryId;
      let editedColumn = params.column.colId;
      let editedValue = params.newValue;

      let existIndex = this.editedRows.findIndex(v => v.salaryId === editedColumnId);
      if(existIndex != -1){
        eval(`this.editedRows[existIndex].${editedColumn} = editedValue`);
      }else{
        let editedRow = {};
        editedRow['salaryId'] = editedColumnId;
        editedRow[editedColumn] = editedValue;
        this.editedRows.push(editedRow);
      }
    },

    //grid 값 수정 후 저장 버튼
    onClickSaveBtn(){
        this.loading = true;
        if(this.editedRows.length != 0){
          this.axios.post("/api/v1/hr/updateSalaryList", this.editedRows, {
            headers: {
                "Content-type": "application/json",
            },
          }).then((res) => {
            if(res.data.success){
              this.loading = false;
              this.successMsg = "저장 완료";
              this.success = true;
              this.getSearchList();
            }else {
              console.log(res.data.message);
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
        }else if(this.editedRows.length == 0){
            this.loading = false;
            this.errMsg = "수정할 항목이 없습니다.";
            this.error = true;
        }
        

    },

    //급여계산 버튼
    calcSalary(){
      this.setDateFormat();
      let sendData = {
        companyId: this.search.company.value,
        estId: this.search.business.value,
        yyyymm: this.search.yyyymm
      };

        this.loading = true;
        this.axios.post("/api/v1/hr/calcSalary", sendData, {
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => {
            if(res.data.success){
              this.loading = false;
              this.successMsg = "급여계산 완료";
              this.success = true;
            }else {
              console.log(res.data.message);
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

    //excel 업로드시 파일 validation
    formValidation(value){
      const allowedFileType= /(\.csv|\.xlsx|\.xls)$/i;

      if(!value || value.length === 0){
        this.popupErrMsg = "업로드할 파일을 선택해주세요.";
      }else if(!allowedFileType.test(value[0].name)){
        this.popupErrMsg = "올바른 파일 형식(csv, xlsx, xsl)이 아닙니다."
      }else return true;

      return false;
    },

    //연차정산,초과수당 버튼
    uploadOtherAllowance(){
      this.setDateFormat();
      if(this.formValidation(this.file)){
        let uploadFile = this.file[0];
        var frm = new FormData();
        frm.append('file', uploadFile);
        frm.append('yyyymm', this.search.yyyymm);

          this.loading = true;
          this.axios.post(encodeURI("/api/v1/hr/uploadOtherAllowance/"), frm, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
            if (res.data.success) {
              console.log(res.data.message);
              this.popupErrMsg = '';
                this.uploadPopup = false;
                this.loading = false;
                this.successMsg = "업로드가 완료되었습니다."
                this.success = true;
                this.file = null;
                this.getSearchList();
            }else {
              console.log(res.data.message);
              this.popupErrMsg = res.data.message;
              this.loading = false;
            }
          }).catch((error => {
            this.loading = false;
            console.log(error);
            this.errMsg = error.message;
            this.error = true;
        }));
      }else{
        this.popupErrMsg = '업로드중 오류가 발생하였습니다.';
      }

    },

    //세금가져오기 버튼
    getTax(){
      this.setDateFormat();
      let sendData = {
        companyId: this.search.company.value,
        yyyymm: this.search.yyyymm
      };

        this.loading = true;
        this.axios.post("/api/v1/hr/erpiu/getTaxErpIU", sendData, {
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => {
            if(res.data.success){
              this.loading = false;
              this.successMsg = "세금 가져오기 완료";
              this.success = true;
            }else {
              console.log(res.data.message);
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

    //하단 레포트 다운로드 버튼 4개 파라미터(reportType)으로 구분
    downloadReport(reportType){
      
      if(reportType=="Payroll" && this.search.payrollSort == ""){
        this.errMsg = "급여대장 분류를 선택해주세요.";
        this.error = true;
      }else{
        this.setDateFormat();
        let sendData = {
          companyId: this.search.company.value,
          estId: this.search.business.value,
          yyyymm: this.search.yyyymm,
          reportType: reportType,
          payrollSort: this.search.payrollSort.value,
          sort: this.search.sort.value
        };

          this.loading = true;
          this.axios.post("/api/v1/hr/downloadReport", sendData, {
              headers: {
                  "Content-type": "application/json",
              },
              responseType: "blob",
          })
          .then((res) => {
            if(res.data.size == 0) {
              this.loading = false;
              this.errMsg = "다운로드 중 오류가 발생했습니다."
              this.error = true;
            }else {
              const name = res.headers["content-disposition"]
              .split("filename=")[1]
              .replace(/"/g, "");
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", name);
              link.style.cssText = "display:none";
              document.body.appendChild(link);
              link.click();
              link.remove();

              this.loading = false;
              this.successMsg = "엑셀 다운로드 완료";
              this.success = true;
            }
          }).catch((error => {
            this.loading = false;
            console.log(error);
            this.errMsg = error.message;
            this.error = true;
        }));
      }
      
    },

    //이메일 전송할(selected) row 담기
    getSelectedRows() {
        let selectedNodes = this.pay_calculate.gridApi.getSelectedNodes();
        if(selectedNodes.length != 0){
          let selectedData = selectedNodes.map( node => node.data );
          this.email_grid.rowData = selectedData;
          return true;
        }else{
          return false;
        }
        
    },

    //급여 이메일전송 버튼
    openPopup(){
      if(this.getSelectedRows()){
        this.errMsg = ""
        this.dialog = true;
      }else{
        this.error = true;
        this.errMsg = "선택한 사원이 없습니다.";
      }
      
    },

    //이메일 전송 팝업 내 close 버튼
    closePopup(){
      this.dialog = false;
      this.email_grid.rowData = [];
    },

    //이메일 전송 팝업 내 send 버튼
    onClickSendBtn(){
      //팝업 내 grid의 selected row 사번 담기
      let selectedNodes = this.email_grid.gridApi.getSelectedNodes();
      if(selectedNodes.length != 0){
        let selectedData = selectedNodes.map(node => node.data);
        console.log(selectedData);
        let employeeNumberList = [];
        for(let i=0; i<selectedData.length; i++){
          employeeNumberList.push(selectedData[i].employeeNumber);
        }
        console.log(employeeNumberList);

        this.setDateFormat();
        let sendData = {
          companyId: this.search.company.value,
          estId: this.search.business.value,
          yyyymm: this.search.yyyymm,
          employeeNumberList: employeeNumberList
        };

          this.loading = true;
          this.axios.post("/api/v1/hr/sendPayStubMailDH", sendData, {
              headers: {
                  "Content-type": "application/json",
              },
          })
          .then((res) => {
            console.log(res);
            this.loading = false;
          }).catch((error => {
            this.loading = false;
            console.log(error);
            this.errMsg = error.message;
            this.error = true;
        }));    

      }else{
        this.error = true;
        this.errMsg = "선택한 사원이 없습니다.";
      }
    }

  },
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
      <v-alert color="primary" :text= successMsg >
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
          <i class="tio- text-primary text-20">money</i>
        </div>
        <div class="text-20 f-600">급여 계산</div>
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
          <v-col cols="2">
            <VueDatePicker
              class="v-input__control"
              v-model="search.date"
              :format="dateformat"
              mode-height="190"
              month-picker>
            </VueDatePicker>
          </v-col>
          <v-col cols="4">
            <div class="btn-right pr-5">
              <v-btn color="primary" flat class="px-3 ma-3" width="100" height="40" @click="getSearchList">
                <span class="text-20">조회</span>
              </v-btn>
              <v-btn color="primary" flat class="px-3 ma-3" width="100" height="40" @click="onClickSaveBtn">
                <span class="text-20">저장</span>
              </v-btn>
            <!-- <v-btn color="primary" flat class="px-3" width="200" height="40" @click="getBasicSalaryData">
              <span class="text-20">급여항목가져오기</span>
            </v-btn> -->
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-text-field
                class="mw-200 px-3"
                label="이름"
                variant="outlined"
                hide-details=""
                v-model="search.koreanName"
                @keyup.enter="getSearchList"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select
              class="mw-200 px-3"
              label="구분"
              variant="outlined"
              :items="sort"
              item-title="name"
              item-value="value"
              v-model="search.sort"
              return-object
              hide-details="">
            </v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- 구분선 --><hr class="my-5">
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="2">
          <v-btn color="primary" flat @click="calcSalary" width="150" height="40">
            <span class="text-16">급여계산</span></v-btn>         
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" flat class="detail-search" @click="searchShow=true" width="150" height="40">
            <span class="text-15">연차정산/초과수당</span></v-btn>
            <v-overlay
            activator="parent"
            location-strategy="connected"
            persistent
            v-model="uploadPopup"
            >
              <v-card class="excel-card">
                <h4 class="ma-3 text-subtitle-2 font-weight-bold">엑셀 업로드</h4>
                <v-divider></v-divider>
                <v-row>
                    <v-col>
                      <v-row class="ma-5">
                        <v-file-input 
                          label="연차정산/초과수당"
                          v-model="file"
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
                    @click="this.uploadPopup = false;"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="uploadOtherAllowance"
                >
                    Upload
                </v-btn>
                </v-card-actions>
              </v-card>
            </v-overlay>
      </v-col>
      <v-col cols="2">
          <v-btn color="primary" flat @click="downloadReport('ERPIU')" width="150" height="40">
            <span class="text-16">ERP IU 업로드</span></v-btn>
      </v-col>
      <v-col cols="2">
          <v-btn color="primary" flat width="150" height="40" @click="getTax">
            <span class="text-16">세금가져오기</span></v-btn>
      </v-col>
      <v-col cols="2">
          <v-btn color="primary" flat @click="openPopup" width="150" height="40">
            <span class="text-16">급여 이메일전송</span></v-btn>
      </v-col>
    </v-row>
    <!-- <v-row v-if="errMsg">
      <v-col cols="6" class="mx-7"></v-col>
      <v-col cols="5">
        <v-alert
          color="error"
          theme="dark"
          border="start"
          prominent
          class="mw-700 mx-auto"
        >
          <i class="tio- text-18 me-2"> error_outlined </i>
          {{ errMsg }}
        </v-alert>
      </v-col>
    </v-row> -->
    <v-row class="grid-wrap">
      <v-col cols="12">
        <!--pay_calculate table-->
        <ag-grid-vue
        style="height: 700px"
        class="ag-theme-balham"
        :columnDefs="pay_calculate.columnDefs"
        :defaultColDef="pay_calculate.defaultColDef" 
        :rowData="pay_calculate.rowData"
        rowSelection="multiple"
        :isRowSelectable="pay_calculate.isRowSelectable"
        @grid-ready="onPayGridReady"
        @cellValueChanged="onCellValueChanged"
        >
        </ag-grid-vue>
      </v-col>
    </v-row>
    <v-row class="align-center justify-center">
      <v-col cols="2"></v-col>
      <v-col cols="2">
        <v-select
            label="분류"
            variant="outlined"
            :items="payrollSort"
            item-title="name"
            item-value="value"
            v-model="search.payrollSort"
            return-object
            hide-details=""
            density="compact">
        </v-select>
      </v-col>
      <v-col cols="2">
        <v-btn class="my-3" color="primary" flat width="150" height="40" @click="downloadReport('Payroll')">
          <span class="text-16">급여대장</span>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" flat width="150" height="40" @click="downloadReport('Payroll6InTable')">
          <span class="text-16">급여표(6쪽)</span></v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" flat width="150" height="40" @click="downloadReport('Paystub')">
          <span class="text-16">급여명세서</span></v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" flat width="150" height="40" @click="downloadReport('PersonalPayroll')">
          <span class="text-16">개인급여내역</span></v-btn>
      </v-col>
    </v-row>
    <!--E-mail 전송 팝업창-->
    <v-dialog
      v-model="dialog"
      persistent
      width="800"
    >
      <v-card>
        <v-card-title>
          <span class="text-title f-600">급여명세서 E-mail 전송</span>
        </v-card-title>
        <v-card-text>
          <!--email_grid table-->
          <ag-grid-vue
            style="height: 250px"
            class="ag-theme-balham"
            :columnDefs="email_grid.columnDefs"
            :defaultColDef="email_grid.defaultColDef" 
            :rowData="email_grid.rowData"
            rowSelection="multiple"
            @grid-ready="onEmailGridReady"
          >
          </ag-grid-vue>
          <v-alert v-if="popupErrMsg"
            color="error"
            theme="dark"
            border="start"
            prominent
            class="mw-700 mx-auto ma-1"
          >
            <i class="tio- text-18 me-2"> error_outlined </i>
            {{ popupErrMsg }}
          </v-alert>
        </v-card-text>
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
            @click="onClickSendBtn"
        >
            Send
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style lang="scss" scoped>
.centered {
  .ag-header-cell-label {
    justify-content: center !important;
  }
}
.ag-row {
  .centered {
    justify-content: center !important;
    text-align: center;
  }
}

.btn-right{
  float: right;
}

.grid-wrap {
    flex-wrap: nowrap;
    width: 100%;
}

.excel-card{
  width:30rem;
}

.sum-row{
  background-color: lightgray !important;
}

</style>


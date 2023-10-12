<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-balham.css";
import PopupSearch from "../../components/layout/PopupSearch.vue";

export default {
    components: {
        AgGridVue,
        PopupSearch,
    },

    data() {
        return{
            dialog: false,
            error: false,
            errMsg: "",
            slaveErrMsg: "",
            popupErrMsg: "",
            popupTitle: "",
            popupflag: "",
            module_store: [],
            search: {
                moduleId: "",
                module: "",
                keyword: "",
            },

            //popup form v-model data
            formData: {
                codeDetailId: "",
                codeId: "",
                definedCd: "",
                definedName: "",
                definedEngName: "",
                useYn: "Y",
                value01: "",
                value02: "",
                value03: "",   
            },

            //grid's selected data
            selectedRow: null,
            detailSelectedRow: null,

            fnd_code: {
                gridOptions: null,
                gridApi: null,
                columnApi: null,
                defaultColDef: {
                    resizable: true,
                },
                columnDefs: [
                    { headerName: "No.", field: "No.", valueGetter: 'node.rowIndex + 1', maxWidth: 50, minWidth:50, },
                    { headerName: "codeId", field: "codeId", hide: true,},
                    { headerName: "구분코드", field: "codeField" },
                    { headerName: "구분코드명", field: "codeName" },
                    { headerName: "SYS 코드", field: "codeType", maxWidth: 80, },
                ],
                rowData: [],
            },

            fnd_code_detail_sys: {
                gridOptions: null,
                defaultColDef: {
                    resizable: true,
                    maxWidth: 140,
                },
                columnDefs: [
                    { headerName: "No.", field: "No.", valueGetter: 'node.rowIndex + 1', maxWidth: 50, minWidth:50, },
                    { headerName: "codeId", field: "codeId", hide: true,},
                    { headerName: "codeDetailId", field: "codeDetailId", hide: true,},
                    { headerName: "구분코드", field: "definedCd" },
                    { headerName: "구분코드명", field: "definedName" },
                    { headerName: "구분코드명(EN)", field: "definedEngName"},
                    { headerName: "사용여부", field: "useYn", maxWidth: 80, },
                    { headerName: "관련1", field: "value01" },
                    { headerName: "관련2", field: "value02" },
                    { headerName: "관련3", field: "value03" },
                ],
                rowData: [],
            },

            fnd_code_detail_com: {
                gridOptions: null,
                defaultColDef: {
                    resizable: true,
                    maxWidth: 140,
                    editable: false,
                },
                columnDefs: [
                    { headerName: "", headerCheckboxSelection: false, checkboxSelection: true, maxWidth: 40, minWidth:40, },
                    { headerName: "codeId", field: "codeId", hide: true,},
                    { headerName: "codeDetailId", field: "codeDetailId", hide: true,},
                    { headerName: "구분코드", field: "definedCd"},
                    { headerName: "구분코드명", field: "definedName" },
                    { headerName: "구분코드명(EN)", field: "definedEngName"},
                    { headerName: "사용여부", field: "useYn", maxWidth: 80,
                        // cellEditor: 'agSelectCellEditor',
                        // cellEditorPopup: true,
                        // cellEditorParams: { cellHeight: 50, values: ['Y', 'N'] },
                    },
                    { headerName: "관련1", field: "value01" },
                    { headerName: "관련2", field: "value02" },
                    { headerName: "관련3", field: "value03" },
                ],
                rowData: [],
            },
            
        }
    },

    beforeMount() {
        this.setSelectBox();
        this.gridOptions = {
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
            animateRows: true,
        }
    },

    methods: {

        setSelectBox(){
            //모듈 selectBox
            this.axios.post("/api/v1/common/getCommonModuleList", {
                headers: {
                    "Content-type": "application/json",
                },
            })
            .then((res) => {
                if(res.data.success){
                this.module_store = res.data.data;
                this.search.module = this.module_store[0];
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

        onMasterGridReady(params){
            this.getMasterGrid();
            this.fnd_code.gridApi = params.api;
            this.fnd_code.columnApi = params.columnApi;
            this.fnd_code.gridApi.sizeColumnsToFit();
        },

        onFirstDataRendered(params){
            const allNodes = [];
            params.api.forEachNode(function (node){
                allNodes.push(node);
            })
            allNodes[0].setSelected(true);  //첫번째 node setSelected 설정
        },

        onDetailGridReady(params){
            this.fnd_code_detail_sys.gridApi = params.api;
            this.fnd_code_detail_sys.gridColumnApi = params.columnApi;
            this.fnd_code_detail_sys.gridApi.sizeColumnsToFit();
            this.fnd_code_detail_com.gridApi = params.api;
            this.fnd_code_detail_com.gridColumnApi = params.columnApi;
            this.fnd_code_detail_com.gridApi.sizeColumnsToFit();
        },

        getSelectedRow(e) {
            const selectedNode = e.api.getSelectedNodes();
            const selectedData = selectedNode.map( node => node.data );
            return this.selectedRow = selectedData[0];
        },

        getDetailSelectedRow(e){
            const selectedNode = e.api.getSelectedNodes();
            const selectedData = selectedNode.map( node => node.data );
            return this.detailSelectedRow = selectedData[0];
        },

        //master grid
        getMasterGrid(){
            this.axios.post("/api/v1/common/getcodelist", {
                headers: {
                    "Content-type": "application/json",
                },
            })
            .then((res) => {
                if(res.data.success){
                    this.fnd_code.rowData = res.data.data;
                    this.getDetailGrid();
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

        //detail grid
        getDetailGrid(){
            const param = {
                codeId: '',
            }

            if(!this.selectedRow){
                param.codeId = this.fnd_code.rowData[0].codeId;
            }else{
                param.codeId = this.selectedRow.codeId;
            }
            
            if(param.codeId){
                this.axios.post("/api/v1/common/getcodeDetaillist", param, {
                    headers: {
                        "Content-type": "application/json",
                    },
                })
                .then((res) => {
                    if(res.data.success){
                        this.fnd_code_detail_sys.rowData = res.data.data.codeDetailListSys; //sys code 상단 grid
                        this.fnd_code_detail_com.rowData = res.data.data.codeDetailListCom; //com code 하단 grid
                    }else {
                        this.errMsg = res.data.message;
                        this.error = true;
                }
                }).catch((error => {
                    console.log(error);
                    this.errMsg = error.message;
                    this.error = true;
                }));
            }else{
                console.log("codeId is null");
            }
            
        },

        //조회 버튼
        getSearchList(){
            this.fnd_code.rowData = [];
            this.search.moduleId = this.search.module.moduleId;
            
            this.axios.post(" /api/v1/common/getCommonCodelistSearch", this.search, {
                headers: {
                    "Content-type": "application/json",
                },
            })
            .then((res) => {
                if(res.data.success){
                    this.fnd_code.rowData = res.data.data;
                    this.fnd_code_detail_sys.rowData = [];
                    this.fnd_code_detail_com.rowData = [];

                    // this.getDetailGrid();
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

        //com code 추가, 수정 버튼
        openPopup(param){
            this.slaveErrMsg = "";

            if(!this.selectedRow){
                this.selectedRow = this.fnd_code.rowData[0];
            }

            //추가 버튼
            if(param == 'add'){
                try{
                    this.popupflag = 'add';
                    this.formData = {
                        codeDetailId: "",
                        codeId: this.selectedRow.codeId,
                        definedCd: "",
                        definedName: "",
                        definedEngName: "",
                        useYn: "Y",
                        value01: "",
                        value02: "",
                        value03: "",
                    };

                    if(this.detailSelectedRow != null){
                        this.fnd_code_detail_com.gridApi.deselectAll();
                    }
                    this.popupTitle = '코드 추가';
                    this.dialog = true;
                }catch(error){
                    console.log(error);
                    this.errMsg = error.message;
                    this.error = true;
                };
                
            }
            //수정 버튼
            else if(param == 'modify'){
                this.popupflag = 'modify';
                if(this.detailSelectedRow != null){
                    this.formData = this.detailSelectedRow;
                    this.popupTitle = '코드 수정';
                    this.dialog = true;
                }else{
                    this.slaveErrMsg = "수정할 코드를 선택해주세요.";
                }
                
            }

        },

        //com code 추가,수정 팝업 내 validation
        formValidation(formData){

            if(!formData.definedCd){
                this.popupErrMsg = "구분 코드는 필수 입력사항입니다.";
            }else if(!formData.definedName){
                this.popupErrMsg = "구분 코드명은 필수 입력사항입니다.";
            }else{
                this.popupErrMsg = "";
                return true;
            }
            return false;
        },

        //com code 추가
        addCodeDetailCom(){
            if(this.formValidation(this.formData)){
                this.axios.post(" /api/v1/common/codeDetailComAdd", this.formData, {
                    headers: {
                        "Content-type": "application/json",
                    },
                })
                .then((res) => {
                    if(res.data.success){
                        this.getDetailGrid();
                        this.dialog = false;
                    }else {
                        this.popupErrMsg = res.data.message;
                        console.log("addCodeDetailCom Fail");
                    }
                }).catch((error => {
                    console.log(error);
                    this.popupErrMsg = error.message;
                }));
            }
        },

        //com code 수정
        updateCodeDetailCom(){
            if(this.formValidation(this.formData)){
                this.axios.post(" /api/v1/common/codeDetailComUpdate", this.formData, {
                    headers: {
                        "Content-type": "application/json",
                    },
                })
                .then((res) => {
                    if(res.data.success){
                        this.getDetailGrid();
                        this.dialog = false;
                    }else {
                        this.popupErrMsg = res.data.message;
                        console.log("updateCodeDetailCom Fail");
                    }
                }).catch((error => {
                    console.log(error);
                    this.popupErrMsg = error.message;
                }));
            }
        },

        //com code 삭제
        deleteCodeDetailCom(){
            if(this.detailSelectedRow != null){
                this.formData = this.detailSelectedRow;
                    this.axios.post("/api/v1/common/codeDetailComDelete", this.formData, {
                        headers: {
                            "Content-type": "application/json",
                        },
                    })
                    .then((res) => {
                        if(res.data.success){
                            this.getDetailGrid();
                        }else {
                            this.slaveErrMsg = res.data.message;
                            console.log("deleteCodeDetailCom Fail");
                        }
                    }).catch((error => {
                    console.log(error);
                    this.slaveErrMsg = error.message;
                    }));
            }else{
                this.slaveErrMsg = "삭제할 코드를 선택해주세요.";
            }
        },

    }

};
</script>
<template>
    <v-container>
        <v-overlay
            class="align-center justify-center"
            v-model="error"
            >
            <v-alert color="error" :text= errMsg >
            </v-alert>
        </v-overlay>
        <div class="d-flex align-center mb-7">
            <div class="bg-primary-lighten-5 px-3 py-2 rounded me-3 d-inline-block">
                <i class="tio- text-primary text-20">shopping</i>
            </div>
            <div class="text-20 f-600">코드 관리</div>
        </div>
        <v-row class="align-center mb-2">
            <v-col cols="5">
                <v-select
                    label="Module"
                    variant="outlined"
                    :items="module_store"
                    item-title="description"
                    item-value="moduleId"
                    v-model="search.module"
                    return-object
                    hide-details="">
                </v-select>
                <!-- <PopupSearch 
                    v-model="search.module" 
                    v-on:update:searchTerm="setModule" 
                    :searchTerm="search.module" 
                    v-on:update:searchTermId="setModuleId" 
                    :searchTermId="search.moduleId"  
                /> -->
            </v-col>
            <v-col cols="5">
                <v-text-field
                    label="Search"
                    variant="outlined"
                    hide-details=""
                    v-model="search.keyword"
                    @keyup.enter="getSearchList"
                ></v-text-field>
            </v-col>
            <v-col cols="2" class="pr-36">
                <v-btn color="primary" flat class="grid-btn-wrap" width="100" height="40" @click="getSearchList">
                    <span class="text-20">조회</span>
                </v-btn>
            </v-col>
        </v-row>

        <!-- 구분선 --><hr class="my-5  mr-5">
        <v-row class="grid-wrap">
            <v-col cols="4" class="my-5">
                <!--fnd_code table-->
                <ag-grid-vue
                style="width: 100%; height: 650px"
                class="ag-theme-balham"
                :columnDefs="fnd_code.columnDefs"
                :defaultColDef="fnd_code.defaultColDef" 
                :rowData="fnd_code.rowData"
                rowSelection="single"
                @first-data-rendered="onFirstDataRendered"
                @grid-ready="onMasterGridReady"
                @selection-changed="getDetailGrid"
                @rowClicked="getSelectedRow"
                >
                </ag-grid-vue>
            </v-col>
            <v-col cols="8">
                <v-row class="ma-5">
                    <!--fnd_code_detail table SYS-->
                    <ag-grid-vue
                    style="width: 100%; height: 280px"
                    class="ag-theme-balham"
                    :columnDefs="fnd_code_detail_sys.columnDefs"
                    :defaultColDef="fnd_code_detail_sys.defaultColDef"
                    :rowData="fnd_code_detail_sys.rowData"
                    @grid-ready="onDetailGridReady"
                    >
                    </ag-grid-vue>
                    
                </v-row>
                <v-row class="mx-3" v-if="!fnd_code_detail_com.defaultColDef.editable">
                    <v-col cols="6"></v-col>
                    <v-col cols="2">
                        <v-btn color="primary" flat @click="openPopup('add')" width="100" height="40">
                            <span class="text-16">추가</span>
                        </v-btn> 
                    </v-col>      
                    <v-col cols="2">
                        <v-btn color="primary" flat @click="openPopup('modify')" width="100" height="40">
                            <span class="text-16">수정</span>
                        </v-btn> 
                    </v-col>               
                    <v-col cols="2">
                        <v-btn color="error" flat @click="deleteCodeDetailCom" width="100" height="40">
                            <span class="text-16">삭제</span>
                        </v-btn>
                    </v-col>
                </v-row>
                <!-- <v-row v-else>
                    <v-col cols="7" class="mx-7"></v-col>
                    <v-col cols="2">
                        <v-btn color="primary" flat @click="fnd_code_detail_com.defaultColDef.editable=false">
                            <i class="tio- text-18 me-2">save</i>저장
                        </v-btn>
                    </v-col>
                    <v-col cols="2">
                        <v-btn color="error" flat @click="fnd_code_detail_com.defaultColDef.editable=false">
                            <i class="tio- text-18 me-2">clear</i>취소
                        </v-btn>
                    </v-col>
                </v-row> -->
                <v-row class="mx-5 py-1">
                    <v-alert v-if="slaveErrMsg"
                        color="error"
                        theme="dark"
                        border="start"
                        prominent
                        class="mw-700 mx-auto"
                    >
                        <i class="tio- text-18 me-2"> error_outlined </i>
                        {{ slaveErrMsg }}
                    </v-alert>
                    <!--fnd_code_detail table COM-->
                    <ag-grid-vue
                    style="width: 100%; height: 280px"
                    class="ag-theme-balham"
                    :columnDefs="fnd_code_detail_com.columnDefs"
                    :defaultColDef="fnd_code_detail_com.defaultColDef"
                    :rowData="fnd_code_detail_com.rowData"
                    rowSelection="single"
                    @grid-ready="onDetailGridReady"
                    @selection-changed="getDetailSelectedRow"
                    @rowDoubleClicked="openPopup('modify')"
                    >
                    </ag-grid-vue>
                </v-row>
            </v-col>
        </v-row>
        <!--팝업창-->
        <v-dialog
            v-model="dialog"
            persistent
            width="800"
        >
            <v-card>
                <v-card-title>
                <span class="text-title f-600">{{ this.popupTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                label="구분코드*"
                                variant="outlined"
                                v-model="this.formData.definedCd"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                label="구분코드명*"
                                variant="outlined"
                                v-model="this.formData.definedName"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                label="구분코드명(EN)"
                                variant="outlined"
                                v-model="this.formData.definedEngName"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <!--v-radio 버튼 이미지 안보여서 input으로 대체-->
                                <p class="text-subtitle-2 py-1">사용여부*</p>
                                <input type="radio" name="use_yn" id="Y" value="Y" v-model="this.formData.useYn">
                                <label for="Y" class="text-subtitle-2 ma-1">사용</label>
                                <input type="radio" name="use_yn" id="N" value="N" v-model="this.formData.useYn">
                                <label for="N" class="text-subtitle-2 ma-1">미사용</label>
                                <!-- <v-radio-group v-model="addForm.use_yn" inline label="사용 여부*">
                                    <v-radio label="사용" :value="y" color="primary"></v-radio>
                                    <v-radio label="미사용" :value="n" color="primary"></v-radio>
                                </v-radio-group> -->
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                label="관련1"
                                variant="outlined"
                                v-model="this.formData.value01"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                            <v-text-field
                                label="관련2"
                                variant="outlined"
                                v-model="this.formData.value02"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                            <v-text-field
                                label="관련3"
                                variant="outlined"
                                v-model="this.formData.value03"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                <small>*는 필수 입력 항목입니다.</small>
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
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <v-btn v-if="this.popupflag == 'add'"
                    color="blue-darken-1"
                    variant="text"
                    @click="addCodeDetailCom"
                >
                    Save
                </v-btn>
                <v-btn v-if="this.popupflag == 'modify'"
                    color="blue-darken-1"
                    variant="text"
                    @click="updateCodeDetailCom"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
  </template>

<style lang="scss" scoped>
.grid-wrap {
    flex-wrap: nowrap;
}

.grid-btn-wrap {
    float: right;
}
.pr-36 {
    padding-right: 36px !important;
}
.close-search {
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
.search-card{
    width:400px;
}
</style>
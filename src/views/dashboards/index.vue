<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-balham.css";

export default {
    components: {
        AgGridVue,
    },

    data() {
        return{
            dialog: false,
            addForm: {
                use_yn: "y"
            },
            fnd_code: {
                gridOptions: null,
                gridApi: null,
                columnApi: null,
                defaultColDef: {
                    resizable: true,
                },
                columnDefs: [
                    { headerName: "No.", field: "No.", valueGetter: 'node.rowIndex + 1', maxWidth: 50, minWidth:50, },
                    { headerName: "구분코드", field: "code_field" },
                    { headerName: "구분코드명", field: "code_name" },
                    { headerName: "SYS 코드", field: "code_type", maxWidth: 80, },
                ],
                rowData: [
                    { code_field: "CA_CP00220", code_name: "전표처리메뉴종류", code_type: 'N' },
                    { code_field: "CA_CP00300", code_name: "시스템코드", code_type: 'N' },
                    { code_field: "CA_CP00400", code_name: "연결처리자료종류", code_type: 'N' },
                    { code_field: "CA_CP00500", code_name: "추출자료종류", code_type: 'N' },
                    { code_field: "CA_CPHIS01", code_name: "포괄손익구분", code_type: 'Y' },
                ],
            },

            fnd_code_detail_sys: {
                gridOptions: null,
                defaultColDef: {
                    resizable: true,
                    maxWidth: 140,
                },
                columnDefs: [
                    { headerName: "No.", field: "No.", valueGetter: 'node.rowIndex + 1', maxWidth: 50, minWidth:50, },
                    { headerName: "구분코드", field: "defined_cd" },
                    { headerName: "구분코드명", field: "defined_name" },
                    { headerName: "구분코드명(EN)", field: "defined_eng_name"},
                    { headerName: "사용여부", field: "use_yn", maxWidth: 80, },
                    { headerName: "관련1", field: "value01" },
                    { headerName: "관련2", field: "value02" },
                    { headerName: "관련3", field: "value03" },
                ],
                rowData: [
                    { defined_cd: "1", defined_name: "신규취득", defined_eng_name: "new acquisition", use_yn:"Y", value01: "1", value02: "2", value03: "3" },
                ],
            },

            fnd_code_detail_com: {
                gridOptions: null,
                defaultColDef: {
                    resizable: true,
                    maxWidth: 140,
                    editable: false,
                },
                columnDefs: [
                    { headerName: "", headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 40, minWidth:40,  },
                    { headerName: "구분코드", field: "defined_cd"},
                    { headerName: "구분코드명", field: "defined_name" },
                    { headerName: "구분코드명(EN)", field: "defined_eng_name"},
                    { headerName: "사용여부", field: "use_yn", maxWidth: 80,
                        cellEditor: 'agSelectCellEditor',
                        cellEditorPopup: true,
                        cellEditorParams: { cellHeight: 50, values: ['Y', 'N'] },
                    },
                    { headerName: "관련1", field: "value01" },
                    { headerName: "관련2", field: "value02" },
                    { headerName: "관련3", field: "value03" },
                ],
                rowData: [
                { defined_cd: "40", defined_name: "4레벌", defined_eng_name: "EN_4레벨", use_yn:"Y", value01: "1", value02: "2", value03: "3" },
                ],
            },
            
        }
    },

    beforeMount() {
        this.gridOptions = {
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
            animateRows: true,
            
        }
    },

    methods: {
        onGridReady(params){
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
            this.gridApi.sizeColumnsToFit();
        }

    }

};
</script>
<template>
    <v-container>
        <div class="d-flex align-center mb-7">
            <div class="bg-primary-lighten-5 px-3 py-2 rounded me-3 d-inline-block">
                <i class="tio- text-primary text-18">shopping</i>
            </div>
            <div class="text-subtitle-2 f-600">코드 관리</div>
        </div>
        <v-row>
            <v-col cols="12">
                <v-row class="align-center mb-2">
                    <v-select
                    class="mw-200 px-3"
                    label="Module"
                    variant="outlined"
                    hide-details="">
                    </v-select>
                    <v-text-field
                        class="mw-200 px-3"
                        label="Search"
                        variant="outlined"
                        hide-details=""
                    ></v-text-field>
                    <v-btn color="primary" flat class="px-3">
                    조회
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>

        <!-- 구분선 --><hr class="my-5">
        <v-row class="grid-wrap">
            <v-col cols="4">
                <!--fnd_code table-->
                <ag-grid-vue
                style="width: 100%; height: 650px"
                class="ag-theme-balham"
                :columnDefs="fnd_code.columnDefs"
                :defaultColDef="fnd_code.defaultColDef" 
                :rowData="fnd_code.rowData"
                @grid-ready="onGridReady"
                >
                </ag-grid-vue>
            </v-col>
            <v-col>
                <v-row class="ma-5">
                    <!--fnd_code_detail table SYS-->
                    <ag-grid-vue
                    style="width: 100%; height: 280px"
                    class="ag-theme-balham"
                    :columnDefs="fnd_code_detail_sys.columnDefs"
                    :defaultColDef="fnd_code_detail_sys.defaultColDef"
                    :rowData="fnd_code_detail_sys.rowData"
                    >
                    </ag-grid-vue>
                    
                </v-row>
                <v-row v-if="!fnd_code_detail_com.defaultColDef.editable">
                    <v-col cols="5" class="mx-7"></v-col>
                    <v-col cols="2">
                        <v-btn color="primary" flat @click="dialog=true">
                            <i class="tio- text-18 me-2">add</i>추가
                        </v-btn>         
                    </v-col>
                    <v-col cols="2">
                        <v-btn color="primary" flat @click="fnd_code_detail_com.defaultColDef.editable=true">
                            <i class="tio- text-18 me-2">edit</i>수정
                        </v-btn>
                    </v-col>
                    <v-col cols="2">
                        <v-btn color="error" flat>
                            <i class="tio- text-18 me-2">delete</i>삭제
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row v-else>
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
                </v-row>
                <v-row class="mx-5">
                    <!--fnd_code_detail table COM-->
                    <ag-grid-vue
                    style="width: 100%; height: 280px"
                    class="ag-theme-balham"
                    :columnDefs="fnd_code_detail_com.columnDefs"
                    :defaultColDef="fnd_code_detail_com.defaultColDef"
                    :rowData="fnd_code_detail_com.rowData"
                    rowSelection="multiple"
                    >
                    </ag-grid-vue>
                </v-row>
            </v-col>
        </v-row>
        <!--추가버튼 팝업창-->
        <v-dialog
            v-model="dialog"
            persistent
            width="800"
        >
            <v-card>
                <v-card-title>
                <span class="text-title f-600"><i class="tio- me-2 text-primary">add</i>코드 추가</span>
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
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                label="구분코드명*"
                                hint="example of helper text only on focus"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                label="구분코드명(EN)*"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <!--v-radio 버튼 이미지 안보여서 input으로 대체-->
                                <p class="text-subtitle-2 py-1">사용여부*</p>
                                <input type="radio" id="y" value="y" v-model="addForm.use_yn">
                                <label for="y" class="text-subtitle-2 ma-1">사용</label>
                                <input type="radio" id="n" value="n" v-model="addForm.use_yn">
                                <label for="n" class="text-subtitle-2 ma-1">미사용</label>
                                <!-- <v-radio-group v-model="addForm.use_yn" inline label="사용 여부*">
                                    <v-radio label="사용" :value="y" color="primary"></v-radio>
                                    <v-radio label="미사용" :value="n" color="primary"></v-radio>
                                </v-radio-group> -->
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                label="관련1"
                                type="value01"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                            <v-text-field
                                label="관련2"
                                type="value02"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                            <v-text-field
                                label="관련3"
                                type="value03"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                <small>*는 필수 입력 항목입니다.</small>
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
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="dialog = false"
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
</style>
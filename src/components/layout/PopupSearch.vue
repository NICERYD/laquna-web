<script>
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-balham.css";

export default {
    props: ['searchTerm'],
    emits: ['update:searchTerm', 'update:searchTermId'],

    components: {
        AgGridVue,
    },

    data() {
      return {
        gridOptions: null,
        gridApi: null,
        columnApi: null,
        defaultColDef: {
            resizable: true,
        },
        columnDefs: [
            { headerName: "No.", field: "No.", valueGetter: 'node.rowIndex + 1', maxWidth: 50, minWidth:50, },
            { headerName: "moduleId", field: "moduleId", hide: true,},
            { headerName: "구분코드", field: "moduleName" },
            { headerName: "구분코드명", field: "description" },
        ],
        rowData : [],
        inputdata: "",
        overlay: false,
        errMsg: "",
      }
    },

    mounted(){
        this.getRowData();
    },

    methods: {
        getRowData(){
            try{
                this.axios.post("/api/v1/common/getCommonModuleList", {
                    headers: {
                        "Content-type": "application/json",
                    },
                })
                .then((res) => {
                    if(res.data.success){
                        this.rowData = res.data.data;
                    }else {
                        console.log("getRowData Fail");
                    }
                });
            }catch(err){
                console.log(err.message);
            }
        },
        onGridReady(params){
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
            this.gridApi.sizeColumnsToFit();
        },
        getSelectedRow() {
            const selectedNodes = this.gridApi.getSelectedNodes();
            const selectedData = selectedNodes.map( node => node.data );
            // console.log(selectedData);
            this.inputdata = selectedData[0].description;
        },

        setSearchTerm(e) {
            
            if(e.type == 'keyup'){
                let keword = e.target.value;
                keword = keword.trim();
                keword = keword.toUpperCase();

                for(let index in this.rowData){
                    if(this.rowData[index].moduleName == keword || this.rowData[index].description == keword){
                        this.errMsg ="";
                        this.inputdata = this.rowData[index].description;
                        this.$emit("update:searchTerm", this.rowData[index].description);
                        this.$emit("update:searchTermId", this.rowData[index].moduleId);
                        this.overlay = false;
                        break;
                    }else{
                        this.errMsg = "Invalid Code";
                    }
                }
            }else if(e.type == 'rowDoubleClicked'){
                this.errMsg ="";
                this.$emit("update:searchTerm", e.data.description);
                this.$emit("update:searchTermId", e.data.moduleId);
                this.overlay = false;
            } 
        },

        removeSelectedNumber() {
            this.inputdata = '';
            this.$emit("update:searchTerm", '');
            this.$emit("update:searchTermId", '');
            this.errMsg ="";
        },
    },
  }
</script>

<template>
<div class="search-field">
    <v-text-field
        label="Module"
        variant="outlined"
        hide-details=""
        v-model="inputdata"
        @keyup.enter="setSearchTerm"
    />
        <v-btn
            class="me-1 transparent detail-search"
            icon
            size="small"
            elevation="0"
            @click="searchShow = true"
            ><i class="tio- text-primary text-20"> search </i>
            <v-overlay
            activator="parent"
            location-strategy="connected"
            scroll-strategy="close"
            v-model="overlay"
        >
                <v-card class="search-card">
                    <h4 class="ma-3 text-subtitle-2 font-weight-bold">Module Search</h4>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col class="ma-3">
                            <div class="search-field d-flex w-100">
                                <i class="text-20 text-secondary search-icon tio-">search</i>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    class="flex-1 border-secondary rounded-lg py-2"
                                    v-model="this.inputdata"
                                    @keyup.enter="setSearchTerm"
                                />
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="close-search me-4"
                                @click="removeSelectedNumber"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                                </svg>
                            </div>
                            <div class="text-subtitle-2 py-3" >
                                <v-alert v-if="errMsg"
                                    color="error"
                                    theme="dark"
                                    border="start"
                                    prominent
                                    class="mx-auto"
                                >
                                    <i class="tio- text-18 me-2"> error_outlined </i>
                                    {{ errMsg }}
                                </v-alert>
                                <!-- <p class="text-caption">검색결과({{ rowData.length }}건)</p> -->
                                <v-divider v-if="errMsg" class="py-1"></v-divider>
                                <div class="search-list">
                                    <ag-grid-vue
                                            style="width: 400px; height: 280px"
                                            class="ag-theme-balham"
                                            :columnDefs="columnDefs"
                                            :defaultColDef="defaultColDef"
                                            :rowData="rowData"
                                            rowSelection="single"
                                            @grid-ready="onGridReady"
                                            @selection-changed="getSelectedRow"
                                            @rowDoubleClicked="setSearchTerm"
                                            >
                                    </ag-grid-vue>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
        </v-overlay>
    </v-btn>
</div>

</template>

<style lang="scss" scoped>

 .search-field {
  position: relative;

  .search-icon {
    position: absolute;
    padding-left: 12px;
    top: 50%;
    transform: translateY(-50%);
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
  .detail-search { 
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    background-color: transparent;
    &:hover {
      color: #6366f1;
      cursor: pointer;
    }
  }
  .search-list{
    overflow: auto;
  }
  input {
    padding-left: 40px;
    &:focus {
      outline: none;
    }
  }
}
</style>
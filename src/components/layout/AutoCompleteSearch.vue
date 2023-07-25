<template>
    <div class="search-field d-flex w-100">
        <i class="text-20 text-secondary search-icon tio-">search</i>
        <input
            type="text"
            placeholder="Search"
            class="flex-1 border-secondary rounded-lg py-2"
            :value="searchTerm"
            @input="setSearchTerm"
            @focus="() => setListOpen(true)" 
            @keyup.enter="goToPages"
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
    <div class="text-subtitle-2 py-1" >
        <p class="text-caption">검색결과({{ filteredList.length }}건)</p>
        <v-divider class="py-1"></v-divider>
        <div class="search-list">
            <ul v-if="this.isFocus">
                <li v-for="num in filteredList" @mouseup="setSelectedNumber(num)" @dblclick="goToPages" class="mx-3 py-1 banselect">
                    <div class="d-flex align-center mb-3">
                        <div class="pa-1 bg-primary rounded-circle me-2"></div>{{ num.name }}
                    </div>
                </li>
            </ul>    
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dataList : [
        {
          name: '공통 코드 관리',
          value: 'User Code'
        },
        {
          name: 'ADT 근태 관리',
          value: 'DH ADT'
        },
        {
          name: '급여 계산',
          value: 'DH CalcSalary'
        },
      ],
        searchTerm: '',
        isFocus: false,
        selectedObj: null,
      }
    },
    methods: {
      setSearchTerm(e) {
        this.searchTerm = e.target.value;
      },
      setListOpen(isOpen) {
        this.isFocus = isOpen;
      },
      setSelectedNumber(numObj) {
        this.selectedObj = numObj;
        this.searchTerm = numObj.name
      },
      removeSelectedNumber() {
        this.selectedObj = null;
        this.searchTerm = '';
      },
      goToPages() {
        this.$router.push({
          name: this.selectedObj.value,
        });

      },
    },
    computed: {
      filteredList() {
        if(this.searchTerm === '') {
          return [];
        }
        return this.dataList.filter(num => {
          if(num.name.includes(this.searchTerm)) {
            return num;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.search-field {
  position: relative;
  background-color: #fff;
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

ul {
    list-style-type: none;
    overflow: auto;
}

.banselect{
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* 인터넷익스플로러 */
    user-select: none;
}
</style>
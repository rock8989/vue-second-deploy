<template>
  <section>
    <el-table :data="noticeData">
      <el-table-column prop="id" label="No" width="70" align="center"></el-table-column>
      <el-table-column prop="subj" label="제목" header-align="center">
        <template slot-scope="scope">
          <span class="link" @click="onDetail(scope)">{{scope.row.subj}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tp" align="center" label="구분" width="150">
      </el-table-column>
      <el-table-column prop="createdAt" align="center" label="등록일" width="220">
      </el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next" 
      :page-size="pageSize" 
      :total="total"
      :current-page.sync="currentPage" 
      @current-change="onPageChange"> 
    </el-pagination>
    
    <div class="bottomBtns">
      <el-button type="primary" @click="$router.push('/notice/register')">공지사항 등록</el-button>
    </div>
  </section>
</template>

<script>
  // import axios from 'axios'
  import Cookies from 'js-cookie'
  import { noticeList } from '@/api/app'
  export default {
    data() {
      return {
        noticeData: [],
        total: 1,
        pageSize: 10,
        currentPage: 1
      }
    },
    created() {
      this.onList()
    },
    methods: {
      onList() {
        // axios.get('http://localhost:3000/notice')
        noticeList()
        .then(res => {
          console.log('==== res ====')
          console.log(res)
          console.log('==== res ====')

          // this.noticeData = res.data.noticeData

          const notiData = res.data.noticeData

          console.log('notiData.length = ', notiData.length)

          this.total = notiData.length

          let currentMaxLow = this.currentPage * this.pageSize
          let currentMinLow = currentMaxLow - this.pageSize

          console.log(currentMaxLow, currentMinLow)

          this.noticeData = notiData.slice(currentMinLow, currentMaxLow)

        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {

        })
      },
      onDetail(scope) {
        console.log(scope)

        this.$router.push({ path: '/notice/detail', query: { noticeId:scope.row.id } })
      },
      onPageChange(pageNo) {
        console.log('pageNo = ', pageNo)

        this.onList()
      }
    },
    beforeRouteEnter (to, from, next) {
      if (Cookies.get('token')) {

        if (to.path === '/login') {
          next({ path: `/` })
        } else {
          next()
        }

      } 
      else {
        if (to.path !== '/login') {
          // next({path:'/login'})
          next({path:`/login?redirect=${to.path}`})
        } else {
          next()
        }
      }
    }
  }
</script>

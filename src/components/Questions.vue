<template>
<!-- eslint-disable -->
    <div>
       <span v-for="(question,i) in questions">
         <label for="q">{{question.questionContent}}</label>
         <input type="text" name="q" id="q" v-model="reponse[i]">
         
       </span>
    </div>
</template>

<script>
/* eslint-disable */

export default {
  props:{
    questions: Array,
    reponse: Array,
  },

  data() {
    return {
      
    }
  },
  
    
  
}
</script>
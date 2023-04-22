<template>
    <div class="container">
        <slot> </slot>
    </div>
</template>

<style scoped>
    .container{
        width: 75vw;
        margin: 0 auto;
        border: solid 3px red;
        padding: 0 5px;
    }  

    @media screen and (max-width: 480px){
            .container{
            width: 100vw;
            margin: 0 auto;
            border: solid 3px red;
            padding: 0 5px;
        } 
    }

    @media screen and (min-width: 480px){
        .sub-title{
            display: none;
        }
    }
</style>
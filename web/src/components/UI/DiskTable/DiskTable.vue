<template>
  <table class="disk-table">
    <thead>
    <tr>
      <th>
        Название
      </th>
      <th>
        Тип
      </th>
      <th>
        Размер
      </th>
      <th>
        Действия
      </th>
    </tr>
    </thead>
    <tbody>
    <DiskTableBlock
        v-for="element in $store.state.diskStore.diskElements"
        :key="element.id"
        :table-element="element"
    />
    <DiskTablePagination/>
    </tbody>
  </table>
</template>

<script>

import DiskTableBlock from "@/components/UI/DiskTable/DiskTableBlock/DiskTableBlock";
import DiskTablePagination from "@/components/UI/DiskTable/DiskTableBlock/DiskTablePagination/DiskTablePagination";

export default {
  name: "DiskTable",
  components: {
    DiskTableBlock,
    DiskTablePagination
  }
}
</script>

<style lang="less">
.disk-table {
  text-align: center;
  border-collapse: collapse;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto 50px;
  border: 1px solid;
  padding: 10px;

  tr {
    height: 70px;
    border-bottom: 1px dotted;
  }

  th {
    font-size: 16px;
    border-bottom: 1px solid;
    padding: 5px 10px;
  }

  td {
    font-size: 14px;
    padding: 5px 10px;
    width: 25%;
  }

  &__item {

    &--dir {
      .disk-table__item__name {
        cursor: pointer;
        text-decoration: underline;
        color: #fc401d;

        &:hover {
          text-decoration: none;
        }
      }
    }

    &__controls {
      display: flex;
      justify-content: center;
    }
  }

  &__pagination {
    border-top: 1px solid;

    &__controls {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__button {
      width: 38px;
      margin: 0 30px;
    }

    &__page {
      font-size: 18px;
      margin: 0 5px;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;

      &--current {
        border-radius: 100%;
        border: 1px solid;
      }
    }
  }
}
</style>
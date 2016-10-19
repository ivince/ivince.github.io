---
title: 排序算法
date: 2016-10-19 15:57:55
tags: [算法, 排序]
---

#### 交换函数
``` cpp
/*
交换函数
*/
void swap(int *list, int low, int high )
{    
    int temp = list[low];
    list[low] = list[high];
    list[high] = temp;
}
```

#### 冒泡排序
``` cpp
/*
冒泡排序（稳定）
原理：第一次的内部for循环从记录数组的底部比较到顶部，比较相邻的值。
如果低序号的值比高序号的值大，则二者交换顺序
代价是n2
*/
void bubsort( int *list, int n )
{
    int i,j;
    for ( i = 0; i < n-1; i++ )
    {
        for ( j = n-1; j > i; j-- )
        {    
            if( lt( list[j], list[j-1] ) )
                swap( list, j, j-1 );
        }
    }
}
```

#### 选择排序
``` cpp
/*
选择排序（不稳定）
原理：选择排序的第i次是“选择”数组中第i小的记录，并将该记录放到数组的第i个位置。
即首先从未排序的序列中找到最小的值，接着找到次小的，依次类推
代价是n2
*/
void selsort( int *list, int n )
{
    int i,j;
    for ( i = 0; i < n-1; i++ )
    {
        int low_index = i;
        for ( j = n-1; j > i; j-- )
        {    
            if( lt( list[j], list[low_index] ) )
                low_index = j;
        }
        swap( list, i, low_index );
    }
}
```

#### 插入排序
``` cpp
/*
插入排序函数（shell排序的辅助函数）
*/
void inssort( int *list, int n, int incr )
{
    int i,j;
    for ( i = incr; i < n; i += incr )
    {
        for ( j = i; (j >= incr) && (lt (list[j],list[j-incr]) ); j -= incr )
        {    
            swap( list, j, j-incr );
        }        
    }
}
```

#### 快速排序
``` js
function quickSort(array) {
	// 交换元素位置
	function swap(array, i, k) {
		var temp = array[i];
		array[i] = array[k];
		array[k] = temp;
	}
	// 数组分区，左小右大
	function partition(array, left, right) {
		var storeIndex = left;        
		var pivot = array[right]; // 直接选最右边的元素为基准元素
		for (var i = left; i < right; i++) {
			if (array[i] < pivot) {
				swap(array, storeIndex, i);
				storeIndex++; // 交换位置后，storeIndex 自增 1，代表下一个可能要交换的位置
			}
		}
		swap(array, right, storeIndex); // 将基准元素放置到最后的正确位置上
		return storeIndex;
	}
	function sort(array, left, right) {
		if (left > right) {
			return;
		}
		var storeIndex = partition(array, left, right);
		sort(array, left, storeIndex - 1);
		sort(array, storeIndex + 1, right);
	}
	sort(array, 0, array.length - 1);
	return array;
}
```

#### 参考
> [面试中的10大排序算法总结][1]
> [各种排序算法的C++实现][2]
> [常见排序算法-快速排序][3]

[1]:http://www.codeceo.com/article/10-sort-algorithm-interview.html
[2]:http://blog.chinaunix.net/uid-21592001-id-3221516.html
[3]:http://bubkoo.com/2014/01/12/sort-algorithm/quick-sort/

# Assembly Syntax Highlighting

This is the test page of syntax highlighting for assembly.

```assembly
in_r1
3
r0_r2
and
r3_out
```

```assembly
# item number
const amount 15
const RAM 0
const INOUT 1

# load values from input to RAM
ADD zero zero t0
label LOAD_LOOP
SLTi t0 amount t1
BEQ zero t1 LOAD_END
LX zero INOUT t1
SX t0 RAM t1
ADDi t0 1 t0
J _ _ LOAD_LOOP
label LOAD_END

# bubble sort start
# loop index: s0
ADD zero zero s0
label BSORT_OUTER
# loop index: s1
ADDi s0 1 s1

label BSORT_INNER
# load and compare
LX s0 RAM t0
LX s1 RAM t1
SLTU t0 t1 t2
BNE t2 zero SWAP_END

#swap
SX s0 RAM t1
SX s1 RAM t0
label SWAP_END
#swap end

SLTi s1 amount-1 t0
BEQ t0 zero BSORT_INNER_END
ADDi s1 1 s1
J _ _ BSORT_INNER

label BSORT_INNER_END

SLTi s0 amount-2 t0
BEQ t0 zero BSORT_OUTER_END
ADDi s0 1 s0
J _ _ BSORT_OUTER

label BSORT_OUTER_END
#bubble sort end

# output
ADD zero zero t0
label OUTPUT
SLTi t0 amount t1
BEQ t1 zero OUTPUT_END
LX t0 RAM t1
SX zero INOUT t1
ADDi t0 1 t0
J _ _ OUTPUT
label OUTPUT_END

const zero 0
const v0 1
const v1 2
const v2 3
const v3 4
const v4 5
const v5 6
const t0 7
const t1 8
const t2 9
const t3 10
const s0 11
const s1 12
const s2 13
const s3 14
const rp 15
```
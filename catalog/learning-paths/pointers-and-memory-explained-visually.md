# Pointers and Memory Explained Visually

[All learning paths](../LEARNING-PATHS.md) · [Library home](../../README.md)

A pointer stores an address; dereferencing uses that address to access an object. These seven animations connect that distinction to memory layout, array traversal and function calls. Follow the sequence to separate three questions: where a value lives, how code accesses it, and how long it remains valid.

**Who this is for:** Students learning C or C++, and programmers who want a visual introduction to addresses, pointer operations and memory lifetimes. Basic variables, arrays and function calls are useful prerequisites.

## What you will learn

- Distinguish a stored value from its memory address and a pointer to it.
- Explain dereferencing and why pointer arithmetic depends on element size.
- Trace stack frames and compare stack and heap object lifetimes.

## Watch in order

Follow these 7 videos in sequence. Each link opens the concept on its course page, with the video, download link and animation Prompt.

### 1. Memory address

An address identifies a location in memory. For a contiguous array, an element's byte offset depends on both its index and its size. Watch how the address spacing changes between differently sized elements.

[Watch Memory address](../computer-science/cs50x.md#c01-a002)

### 2. Memory layout

A memory-layout diagram gives context to program code, data, stack frames and heap allocations. Use this animation to locate each region; the simplified arrangement is a teaching model, not a promise about every operating system's layout.

[Watch Memory layout](../computer-science/cs50x.md#c01-a003)

### 3. Pointer

A pointer's value is an address, distinct from the value stored at its target. Follow the pointer as its target changes, and distinguish changing the pointer from changing the object it points to.

[Watch Pointer](../computer-science/cs50x.md#c01-a001)

### 4. Pointer Dereferencing

Dereferencing follows a pointer to access its target. Compare reading the pointer with reading or writing through it, then consider why an address is unsafe to use after the target object's lifetime has ended.

[Watch Pointer Dereferencing](../computer-science/cs50x.md#c01-a014)

### 5. Pointer Arithmetic

Within an array, advancing a typed pointer by one moves to the next element rather than necessarily the next byte. Watch the element-sized jumps and relate each move to the array index.

[Watch Pointer Arithmetic](../computer-science/cs50x.md#c01-a015)

### 6. Stack vs. Heap

A local object's lifetime can end when a function returns, while a dynamically allocated object can outlive that call. Compare the two lifetimes and ask why returning a pointer to an expired local object is a problem.

[Watch Stack vs. Heap](../computer-science/cs50x.md#c01-a013)

### 7. Recursive Call Stack

Each recursive call adds a frame with its own local state. Follow the frames until the base case, then trace how return values move back through the waiting calls as the stack unwinds.

[Watch Recursive Call Stack](../computer-science/cs50x.md#c01-a016)

## Continue learning

- [Neural Network Training Explained Visually](neural-network-training-explained-visually.md)
- [LLMs and RAG Explained Visually](llms-and-rag-explained-visually.md)

[Browse the full concept index](../INDEX.md)

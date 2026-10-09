# LLMs and RAG Explained Visually

[All learning paths](../LEARNING-PATHS.md) · [Library home](../../README.md)

A large language model processes tokens and predicts a distribution over possible next tokens. Retrieval-augmented generation, or RAG, adds relevant source passages to the model's context before it answers. These eight animations connect the model's text-processing steps to document chunking, semantic search and reranking, so you can follow a question through the full retrieval and generation pipeline.

**Who this is for:** Developers and students who want an introduction to large language models and retrieval-augmented generation. No model-training experience is required; basic familiarity with vectors is helpful.

## What you will learn

- Connect tokenization, embeddings and self-attention to next-token prediction.
- Distinguish document chunking, semantic retrieval and reranking.
- Explain how retrieved passages enter an LLM's context in a RAG pipeline.

## Watch in order

Follow these 8 videos in sequence. Each link opens the concept on its course page, with the video, download link and animation Prompt.

### 1. Text Tokenization

Tokenization splits text into units and maps them to vocabulary IDs. Watch the sentence become tokens, remembering that a token can be a word, part of a word or punctuation.

[Watch Text Tokenization](../artificial-intelligence/ai-nlp.md#c27-a001)

### 2. Word Embeddings

Embeddings represent words as learned vectors. Use the spatial illustration to build intuition for similarity and relationships; real embedding spaces usually have many more dimensions than the diagram.

[Watch Word Embeddings](../artificial-intelligence/ai-nlp.md#c27-a003)

### 3. Self-Attention

Self-attention uses queries, keys and values to mix information across tokens. Follow how scores become weights and how those weights determine which token information contributes to a contextual representation.

[Watch Self-Attention](../artificial-intelligence/ai-nlp.md#c27-a005)

### 4. Next-Token Probability Distribution

A language model produces scores for candidate next tokens, and softmax turns those scores into a probability distribution. Compare the candidates and their probabilities; generating a sequence repeats this prediction process.

[Watch Next-Token Probability Distribution](../artificial-intelligence/ai-gen.md#recvw24maggi13)

### 5. Chunking and Overlap for Retrieval

A retrieval pipeline can split long documents into searchable passages. Watch an overlapping window preserve text across a chunk boundary, and weigh that context against the extra storage and duplicated content.

[Watch Chunking and Overlap for Retrieval](../artificial-intelligence/ai-gen.md#recvw24u8nixtd)

### 6. Embedding-Based Semantic Search

Semantic search compares a query representation with document representations to retrieve related passages. Look for a paraphrase that is relevant despite different wording, and contrast it with a passage that merely shares a keyword.

[Watch Embedding-Based Semantic Search](../artificial-intelligence/ai-gen.md#recvw24vlk0v3k)

### 7. Reranking Retrieved Passages

Reranking evaluates a retrieved shortlist more closely against the query and changes its order. Follow the strongest passage as it moves upward before a smaller selection is passed onward.

[Watch Reranking Retrieved Passages](../artificial-intelligence/ai-gen.md#recvw24wq3zopq)

### 8. Retrieval-Augmented Generation Pipeline

RAG retrieves passages, adds them to the model's context and generates an answer using that context. Trace the question through each stage. Retrieval supplies evidence, but the answer still needs to be checked against its sources.

[Watch Retrieval-Augmented Generation Pipeline](../artificial-intelligence/ai-gen.md#recvw24t2zgqi9)

## Continue learning

- [Pointers and Memory Explained Visually](pointers-and-memory-explained-visually.md)
- [Neural Network Training Explained Visually](neural-network-training-explained-visually.md)

[Browse the full concept index](../INDEX.md)
